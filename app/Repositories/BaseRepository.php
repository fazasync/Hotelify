<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    protected array $with = [];
    protected array $searchable = [];

    public function with(array $relations): static
    {
        $this->with = $relations;
        return $this;
    }

    public function all()
    {
        return $this->model->with($this->with)->get();
    }

    public function find(int $id)
    {
        return $this->model->with($this->with)->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete(int $id): bool
    {
        return $this->find($id)->delete();
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->model->with($this->with);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $searchable = $this->searchable ?? [];
            $query->where(function ($q) use ($search, $searchable) {
                foreach ($searchable as $field) {
                    $q->orWhere($field, 'like', "%{$search}%");
                }
            });
        }

        if (!empty($filters['sort'])) {
            $direction = ($filters['sort_dir'] ?? 'asc') === 'desc' ? 'desc' : 'asc';
            $query->orderBy($filters['sort'], $direction);
        }

        $perPage = min((int) ($filters['per_page'] ?? $perPage), 100);

        return $query->paginate($perPage);
    }
}