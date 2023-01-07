<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Setting;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name' =>  'Admin',
            'gender' =>  1,
            'username' => 'admin',
            'email_verified_at'=>  date('Y-m-d H:i:s'),
            'password' => Hash::make('123123'),
            'role' => 'administrator'
        ]);

        User::create([
            'name' =>  'Health Worker',
            'gender' =>  2,
            'username' => 'bhw',
            'email_verified_at'=>  date('Y-m-d H:i:s'),
            'password' => Hash::make('123123'),
            'role' => 'bhw'
        ]);

        $setting = new Setting;
        $setting->system_short_name = 'BSQI HCIM SYSTEM';
        $setting->system_long_name = 'BARANGAY SUERTE QUIRINO ISABELA HEALTH CENTER INFORMATION MANAGEMENT SYSTEM WITH SMS SUPPORT';
        $setting->login_bg = 'upload/setting/system_bg.jpg';
        $setting->logo = 'upload/setting/system_logo.png';
        $setting->color = '#388E3C';
        $setting->save();

       
    }
}
