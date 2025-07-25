<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $query = Todo::query();

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        return response()->json($query->paginate(5), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'sometimes|boolean',
            'data_vencimento' => ['required', 'date', 'before_or_equal:today'],
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $request->title,
            'completed' => $request->completed,
            'data_vencimento' => $request->data_vencimento,
        ]);

        return response()->json($todo, 201);
    }

    public function show(Todo $todo)
    {
        $this->authorizeTodo($todo);
        return $todo;
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorizeTodo($todo);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
            'data_vencimento' => ['required', 'date', 'before_or_equal:today'],
        ]);

        $todo->update($request->only('title', 'completed', 'data_vencimento'));

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $this->authorizeTodo($todo);
        $todo->delete();

        return response()->json(['message' => 'Tarefa excluída com sucesso']);
    }

    private function authorizeTodo(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            abort(403, 'Acesso não autorizado');
        }
    }
}
