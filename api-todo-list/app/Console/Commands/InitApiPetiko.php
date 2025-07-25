<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class InitApiPetiko extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:init-api-petiko';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Zera o banco, roda seed e inicia o servidor';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('⚙️  Resetando o banco...');
        $this->call('migrate:fresh');

        $this->info('🌱 Rodando seeders...');
        $this->call('db:seed');

        $this->info('🚀 Iniciando servidor Laravel...');
        $this->line('-------------------------------');

        // Inicia o servidor em background
        $process = new Process(['php', 'artisan', 'serve']);
        $process->setTty(true);
        $process->run();

        return 0;
    }
}
