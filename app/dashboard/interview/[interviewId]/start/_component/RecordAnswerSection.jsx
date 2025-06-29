"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'


function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

    const [userAns, setUserAns] = useState('');

    const {user} = useUser();

    const [loading, setLoading] = useState(false);

        const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults

    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(()=>{
        if(results.length>0){
            const fullTranscript = results.map(r=> r.transcript).join(' ');
            setUserAns(fullTranscript);
        }
    },[results])

    useEffect(()=>{
        if(!isRecording && userAns.length>5){
            UpdateUserAnswer();
        }
    },[userAns])

    const StartStopRecording= async()=>{
        if(isRecording)
            {
            stopSpeechToText()           
        }
        else{
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {

        console.log(userAns);
        setLoading(true);
        const feedbackPrompt = "Question: "+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer: "+userAns+", Depending on question and user answer for given interview question "+"please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        console.log({
    mockId: interviewData?.mockId,
    question: mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns: userAns,
    feedback: JsonFeedbackResp?.feedback,
    rating: JsonFeedbackResp?.rating,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    createdAt: moment().format('DD-MM-YYYY')
});


        const resp = await db.insert(UserAnswer)
        .values({
            mockId: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAns,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
        })

        if(resp){
            toast('User answer recorded successfully');
            setUserAns('');
            setResults([]);
        }
        setResults([]);
        setLoading(false);
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-5'>
                <Image src={'/webcam.png'} width={150} height={150} alt='webcam-preview'
                className='absolute'/>
                <Webcam
                mirrored={true}
                style={{
                    height:300,
                    width:'100%',
                    zIndex:10
                }}  
                />
            </div>

            <Button 
            disabled={loading}
            variant="outline" className='my-5'
            onClick={StartStopRecording}
            >
                {isRecording?
                <h2 className='text-red-500 animate-pulse flex gap-2 items-center'>
                    <StopCircle/> Stop Recording
                </h2>
                :
                <h2 className='text-primary flex gap-2 items-center'> <Mic/> Record Answer </h2>
                }</Button>
        </div>
    )
}

export default RecordAnswerSection
