<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [ApiAuthController::class, 'login'])->middleware('guest');

// Rotas protegidas por token
Route::middleware('auth:sanctum')->group(function () {
    // Dados do usuário autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/verificaToken', [ApiAuthController::class, 'verificaToken']);

    // Logout
    Route::post('/logout', [ApiAuthController::class, 'logout']);

    // CRUD de todos (tarefas)
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::get('/todos/{todo}', [TodoController::class, 'show']);
    Route::put('/todos/{todo}', [TodoController::class, 'update']);
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy']);
});
