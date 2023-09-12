'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from '@components/Form'

const UpdateKnowledge = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const knowledgeId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [knowledge, setKnowledge] = useState({
        title: '',
        description: '',
        tag: '',
    });

    useEffect(() => {
        const getKnowledgeDetails = async () => {
            const response = await fetch(`/api/knowledge/${knowledgeId}`);
            const data = await response.json();

            setKnowledge({
                title: data.title,
                description: data.description,
                tag: data.tag,
            })
        }

        if(knowledgeId) getKnowledgeDetails();
    }, [knowledgeId])

    const updateKnowledge = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!knowledgeId) return alert('Knowledge ID not found');

        try{
            const response = await fetch(`/api/knowledge/${knowledgeId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: knowledge.title,
                    description: knowledge.description,
                    tag: knowledge.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            knowledge={knowledge}
            setKnowledge={setKnowledge}
            submitting={submitting}
            handleSubmit={updateKnowledge}
        />
    )
}

export default UpdateKnowledge