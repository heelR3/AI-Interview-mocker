import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function UpgradePage() {
    return (
        <div className='p-5 m-10 bg-gray-400 border rounded-2xl flex flex-col justify-center items-center'>
            <h1 className='font-bold text-2xl mb-2'>This feature is currently unavailable</h1>
        
            <Link href='/dashboard'>
                <Button>Go Home</Button>
            </Link>
        </div>

    )
}

export default UpgradePage
