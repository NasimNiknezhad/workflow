"use client"

import { useState, useEffect } from 'react';
import Login  from '../components/Login';

export default function DefaultLayout() {


  return (
    <div>
    
        <>
          <header>
            <h1>Willkommen zu WorkFlow</h1>
          </header>
          <main className="default-layout">
            <h2>You are logged in!</h2>
            <p>This is your application layout.</p>
          </main>
        </>
     
     
    </div>
  );
}
