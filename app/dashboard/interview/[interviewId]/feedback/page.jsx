"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params, interview}) {
    const { interviewId } = use(params)

    const router = useRouter();

    const [feedbackList, setFeedbackList] = useState([])
    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback = async () => {
        const result = await db.select().
        from(UserAnswer).
        where(eq(UserAnswer.mockId, interviewId))
        .orderBy(UserAnswer.id);

        console.log(result)
        setFeedbackList(result);
    }

    return (
        <div className='p-10'>
            
            {feedbackList?.length==0?
            <h2 className='font-bold text-xl text-gray-500'>No interview feedback record found</h2>
            :
            <>

            <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

            <h2 className='text-blue-500 text-lg my-3'>Your overall interview rating: <strong>{interview?.rating}</strong> </h2>

            <h2 className='text-gray-500 text-sm'>Find below interview question with correct answer, your answer and feedback for improvement</h2>

            {feedbackList && feedbackList.map((item, index) => (
                <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='flex justify-between gap-10 w-full p-2 bg-secondary rounded-lg my-2 text-left'>
                {item.question} <ChevronsUpDown className='h-5 w-5'/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-red-500 p-2 border rounded-lg'> <strong>Rating: </strong> {item.rating} </h2>
                        <h2 className=' p-2 border rounded-lg bg-red-50 text-sm'> <strong>Your Answer: </strong> {item.userAns} </h2>
                        <h2 className=' p-2 border rounded-lg bg-green-50 text-sm text-green-700'> <strong>Correct Answer: </strong> {item.correctAns} </h2>
                        <h2 className=' p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'> <strong>Feedback: </strong> {item.feedback} </h2>
                    </div>
                </CollapsibleContent>
                </Collapsible>
            ))}

            </>}

            <Button onClick={()=> router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback
