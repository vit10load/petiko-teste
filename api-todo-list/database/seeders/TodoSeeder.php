<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    public function run()
    {

        $user1 = User::create([
            'name' => 'Vitor Oliveira',
            'email' => 'vitor@example.com',
            'is_admin' => true,
            'password' => Hash::make('123456'),
        ]);

        $user2 = User::create([
            'name' => 'Maria Silva',
            'email' => 'maria@example.com',
            'is_admin' => false,
            'password' => Hash::make('123456'),
        ]);

        Todo::create([
            'user_id' => $user1->id,
            'title' => 'Estudar Laravel',
            'completed' => false,
            'data_vencimento' => '2025-07-24'
        ]);

        Todo::create([
            'user_id' => $user1->id,
            'title' => 'Fazer exercícios',
            'completed' => true,
            'data_vencimento' => '2025-07-24'
        ]);

        Todo::create([
            'user_id' => $user2->id,
            'title' => 'Comprar livros',
            'completed' => false,
            'data_vencimento' => '2025-07-24'
        ]);
    }
}
