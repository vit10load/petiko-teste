<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'completed', 'data_vencimento'];

    protected $casts = [
        'data_vencimento' => 'date:Y-m-d',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
