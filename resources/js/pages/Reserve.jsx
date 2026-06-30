import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useRoomTypes, useCheckAvailability, useCreateReservation } from '../hooks/useReserve';
import { useCreatePaymentIntent } from '../hooks/useStripe';
import { getStripe } from '../services/stripe';
import StripePaymentForm from '../components/StripePaymentForm';
import Toast from '../components/Toast';

const steps = [
    { num: 1, label: 'Room & Date' },
    { num: 2, label: 'Guest Info' },
    { num: 3, label: 'Confirmation' },
    { num: 4, label: 'Payment' },
];

export default function Reserve() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(1);
    const [toast, setToast] = useState({ message: '', type: 'error', isOpen: false });
    const [form, setForm] = useState({
        room_type_id: searchParams.get('room_type_id') || '',
        room_id: '',
        room_name: '',
        check_in: '',
        check_out: '',
        guests: 2,
        guest_name: user?.name || '',
        guest_email: user?.email || '',
        guest_phone: user?.phone || '',
        guest_address: user?.address || '',
        special_requests: '',
        payment_method: 'bank_transfer',
        total_price: 0,
    });

    const { data: roomTypes, isLoading: typesLoading } = useRoomTypes();
    const { data: availability, isFetching: availLoading } = useCheckAvailability(
        form.check_in && form.check_out ? { check_in: form.check_in, check_out: form.check_out, room_type_id: form.room_type_id || undefined } : null
    );
    const createReservation = useCreateReservation();
    const createPaymentIntent = useCreatePaymentIntent();
    const [clientSecret, setClientSecret] = useState(null);
    const [reservationId, setReservationId] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    useEffect(() => {
        if (step === 4 && reservationId && !clientSecret && !paymentConfirmed) {
            createPaymentIntent.mutateAsync(reservationId).then((res) => {
                setClientSecret(res.client_secret);
            }).catch((err) => {
                setToast({ message: err.response?.data?.message || 'Failed to initialize payment', type: 'error', isOpen: true });
            });
        }
    }, [step, reservationId, clientSecret, paymentConfirmed]);

    const selectedRoomType = roomTypes?.find((rt) => String(rt.id) === form.room_type_id);
    const availableRooms = availability?.data?.available_rooms || [];
    const nights = form.check_in && form.check_out
        ? Math.max(1, Math.ceil((new Date(form.check_out) - new Date(form.check_in)) / (1000 * 60 * 60 * 24)))
        : 0;

    const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

    const handleRoomSelect = (room) => {
        const price = (room.room_type?.base_price || selectedRoomType?.base_price || 0) * nights;
        updateForm('room_id', room.id);
        updateForm('room_name', `${room.room_number} - ${room.room_type?.name || selectedRoomType?.name}`);
        updateForm('total_price', price);
    };

    const canGoNext = () => {
        if (step === 1) return form.check_in && form.check_out && form.room_id;
        if (step === 2) return form.guest_name && form.guest_email;
        if (step === 3) return true;
        return true;
    };

    const nextStep = () => { if (canGoNext()) setStep((s) => Math.min(s + 1, 4)); };
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        try {
            const res = await createReservation.mutateAsync({
                room_id: form.room_id,
                check_in: form.check_in,
                check_out: form.check_out,
                total_price: form.total_price,
                guest_name: form.guest_name,
                guest_email: form.guest_email,
                guest_phone: form.guest_phone || undefined,
                guest_address: form.guest_address || undefined,
            });
            setReservationId(res.data?.id);
            setToast({ message: 'Reservation created! Proceed to payment.', type: 'success', isOpen: true });
            setTimeout(() => setStep(4), 500);
        } catch (err) {
            setToast({ message: err.response?.data?.message || 'Failed to create reservation', type: 'error', isOpen: true });
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentConfirmed(true);
        setToast({ message: 'Payment successful! Your reservation is confirmed.', type: 'success', isOpen: true });
    };

    const formatPrice = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`;

    return (
        <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
            <Toast message={toast.message} type={toast.type} isOpen={toast.isOpen} onClose={() => setToast((p) => ({ ...p, isOpen: false }))} />

            <div className="max-w-4xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-playfair font-bold text-[#0F172A]">Make a Reservation</h1>
                    <p className="text-[#64748B] mt-2">Complete all steps to book your stay</p>

                    <div className="flex items-center gap-2 mt-8 mb-10">
                        {steps.map((s, i) => (
                            <div key={s.num} className="flex items-center gap-2 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                                    step === s.num ? 'bg-[#C8A96B] text-white' : step > s.num ? 'bg-[#22C55E] text-white' : 'bg-gray-200 text-[#64748B]'
                                }`}>
                                    {step > s.num ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : s.num}
                                </div>
                                <span className={`text-sm hidden md:block ${step === s.num ? 'text-[#1E293B] font-medium' : 'text-[#94A3B8]'}`}>
                                    {s.label}
                                </span>
                                {i < steps.length - 1 && <div className={`flex-1 h-px ${step > s.num ? 'bg-[#22C55E]' : 'bg-gray-200'}`} />}
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-[#1E293B]">Choose Room & Dates</h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Check In</label>
                                                <input type="date" value={form.check_in}
                                                    onChange={(e) => { updateForm('check_in', e.target.value); updateForm('room_id', ''); updateForm('room_name', ''); }}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Check Out</label>
                                                <input type="date" value={form.check_out}
                                                    onChange={(e) => { updateForm('check_out', e.target.value); updateForm('room_id', ''); updateForm('room_name', ''); }}
                                                    min={form.check_in || new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Room Type</label>
                                                <select value={form.room_type_id}
                                                    onChange={(e) => { updateForm('room_type_id', e.target.value); updateForm('room_id', ''); updateForm('room_name', ''); }}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] appearance-none bg-white">
                                                    <option value="">All Room Types</option>
                                                    {roomTypes?.map((rt) => (
                                                        <option key={rt.id} value={rt.id}>{rt.name} — {formatPrice(rt.base_price)}/night</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Guests</label>
                                                <select value={form.guests} onChange={(e) => updateForm('guests', Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] appearance-none bg-white">
                                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {nights > 0 && selectedRoomType && (
                                            <div className="bg-[#F1F5F9] rounded-xl px-4 py-3 flex items-center justify-between text-sm">
                                                <span className="text-[#64748B]">{nights} night{nights > 1 ? 's' : ''}</span>
                                                <span className="text-[#1E293B] font-medium">{formatPrice(selectedRoomType?.base_price * nights)}</span>
                                            </div>
                                        )}
                                        {form.check_in && form.check_out && (
                                            <div>
                                                <h3 className="text-sm font-medium text-[#1E293B] mb-3">Available Rooms</h3>
                                                {availLoading ? (
                                                    <div className="flex items-center gap-2 text-[#64748B] text-sm">
                                                        <div className="w-4 h-4 border-2 border-[#C8A96B]/20 border-t-[#C8A96B] rounded-full animate-spin" />
                                                        Checking availability...
                                                    </div>
                                                ) : availableRooms.length === 0 ? (
                                                    <p className="text-sm text-[#EF4444]">No rooms available for selected dates.</p>
                                                ) : (
                                                    <div className="grid md:grid-cols-2 gap-3">
                                                        {availableRooms.map((rm) => (
                                                            <button key={rm.id} onClick={() => handleRoomSelect(rm)}
                                                                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                                                                    form.room_id === rm.id ? 'border-[#C8A96B] bg-[#C8A96B]/5 ring-1 ring-[#C8A96B]' : 'border-gray-200 hover:border-[#C8A96B]/50'
                                                                }`}>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-medium text-[#1E293B]">Room {rm.room_number}</span>
                                                                    <span className="text-xs text-[#64748B]">Floor {rm.floor}</span>
                                                                </div>
                                                                <p className="text-sm text-[#64748B] mt-1">{rm.room_type?.name || selectedRoomType?.name}</p>
                                                                <p className="text-sm font-semibold text-[#C8A96B] mt-1">{formatPrice((rm.room_type?.base_price || selectedRoomType?.base_price || 0) * nights)}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-[#1E293B]">Guest Information</h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Full Name *</label>
                                                <input value={form.guest_name} onChange={(e) => updateForm('guest_name', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Email *</label>
                                                <input type="email" value={form.guest_email} onChange={(e) => updateForm('guest_email', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Phone</label>
                                                <input value={form.guest_phone} onChange={(e) => updateForm('guest_phone', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Address</label>
                                                <input value={form.guest_address} onChange={(e) => updateForm('guest_address', e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B]" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-[#1E293B]">Confirmation</h2>
                                        <div className="bg-[#F8FAFC] rounded-xl p-5 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Room</span>
                                                <span className="text-[#1E293B] font-medium">{form.room_name || 'Selected Room'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Check In</span>
                                                <span className="text-[#1E293B] font-medium">{form.check_in}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Check Out</span>
                                                <span className="text-[#1E293B] font-medium">{form.check_out}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Guests</span>
                                                <span className="text-[#1E293B] font-medium">{form.guests}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Nights</span>
                                                <span className="text-[#1E293B] font-medium">{nights}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#64748B]">Guest</span>
                                                <span className="text-[#1E293B] font-medium">{form.guest_name} ({form.guest_email})</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-3 flex justify-between">
                                                <span className="font-semibold text-[#1E293B]">Total Price</span>
                                                <span className="font-bold text-[#C8A96B] text-lg">{formatPrice(form.total_price)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Special Requests</label>
                                            <textarea value={form.special_requests} onChange={(e) => updateForm('special_requests', e.target.value)} rows={3}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] resize-none"
                                                placeholder="Any special requests? (e.g., extra bed, late check-in)" />
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6 text-center">
                                        {paymentConfirmed ? (
                                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                                                <div className="w-16 h-16 mx-auto bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <h2 className="text-2xl font-bold text-[#1E293B]">Payment Successful!</h2>
                                                <p className="text-[#64748B] mt-2">Your reservation has been confirmed.</p>
                                                <p className="text-sm text-[#64748B] mt-1">Booking code: <span className="font-semibold text-[#C8A96B]">{createReservation.data?.data?.booking_code}</span></p>
                                            </motion.div>
                                        ) : clientSecret ? (
                                            <div className="text-left max-w-md mx-auto">
                                                <h2 className="text-xl font-semibold text-[#1E293B] text-center mb-6">Complete Payment</h2>
                                                <Elements stripe={getStripe()} options={{ clientSecret }}>
                                                    <StripePaymentForm
                                                        amount={form.total_price}
                                                        onSuccess={handlePaymentSuccess}
                                                        onError={(err) => setToast({ message: err.message, type: 'error', isOpen: true })}
                                                    />
                                                </Elements>
                                            </div>
                                        ) : createPaymentIntent.isPending ? (
                                            <div className="py-12">
                                                <div className="w-10 h-10 mx-auto border-3 border-[#C8A96B]/20 border-t-[#C8A96B] rounded-full animate-spin" />
                                                <p className="text-[#64748B] mt-4">Preparing payment form...</p>
                                            </div>
                                        ) : (
                                            <div className="py-12">
                                                <p className="text-[#EF4444]">Failed to initialize payment. Please try again.</p>
                                                <button onClick={() => setClientSecret(null)}
                                                    className="mt-4 px-6 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all cursor-pointer">
                                                    Retry
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {step < 4 && (
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                <button onClick={prevStep} disabled={step === 1}
                                    className="px-6 py-2.5 text-sm font-medium text-[#64748B] hover:text-[#1E293B] disabled:opacity-50 transition-all cursor-pointer">
                                    {step === 1 ? 'Cancel' : 'Previous'}
                                </button>

                                {step < 3 ? (
                                    <button onClick={nextStep} disabled={!canGoNext()}
                                        className="px-8 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] disabled:opacity-50 transition-all cursor-pointer">
                                        Next Step
                                    </button>
                                ) : step === 3 ? (
                                    <button onClick={handleSubmit} disabled={createReservation.isPending}
                                        className="px-8 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] disabled:opacity-50 transition-all cursor-pointer">
                                        {createReservation.isPending ? 'Processing...' : 'Confirm & Reserve'}
                                    </button>
                                ) : null}
                            </div>
                        )}

                        {step === 4 && paymentConfirmed && (
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                <a href="/" className="px-8 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all inline-block">
                                    Back to Home
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
