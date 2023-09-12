'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from '@components/Form'

const CreateKnowledge = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [knowledge, setKnowledge] = useState({
        title: '',
        description: '',
        tag: '',
    });

    const createKnowledge = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('/api/knowledge/new', {
                method: 'POST',
                body: JSON.stringify({
                    title: knowledge.title,
                    description: knowledge.description,
                    userId: session?.user.id,
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
            type="Create"
            knowledge={knowledge}
            setKnowledge={setKnowledge}
            submitting={submitting}
            handleSubmit={createKnowledge}
        />
    )
}

export default CreateKnowledge