"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const { interviewId } = use(params);

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    //used to get interview details by mockId/interviewId
    const GetInterviewDetails = async () => {
    try {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));

        setInterviewData(result[0]);
        } catch (err) {
        console.error("Error fetching interview data:", err);
        }
    };

    return (
        <div className='my-10 '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5'>
                <div className='flex flex-col my-5 gap-3'>
                    
                    {!interviewData ? (
                    <p>Loading interview data...</p>
                    ) : (
                    <div className='flex flex-col p-5 rounded-lg border gap-3'>
                        <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{interviewData.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
                    </div>
                    )}

                    <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div>
                    {webCamEnabled? <Webcam
                    onUserMedia={()=> setWebCamEnabled(true)}
                    onUserMediaError={()=>setWebCamEnabled(false)}
                    mirrored={true}
                    style={{
                        height:300,
                        width:300
                    }}/>
                    :
                    <>
                    <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
                    <div className='flex justify-center items-center'>
                        <Button variant="ghost" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Micropohone</Button>
                    </div>
                    </>
                    }
                </div>

            </div>

            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview
