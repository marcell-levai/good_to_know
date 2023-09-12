'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [knowledges, setKnowledges] = useState([]);

    useEffect(() =>{
        const fetchKnowledges = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/knowledges`);
            const data = await response.json();
            
            setKnowledges(data);
        }

        if(session?.user.id) fetchKnowledges();
    }, []);

    const handleEdit = (knowledge) => {
        router.push(`/update-knowledge?id=${knowledge._id}`);
    }

    const handleDelete = async (knowledge) => {
        const hasConfirmed = confirm("Are you sure you want to delete this knowledge?");

        if(hasConfirmed){
            try {
                await fetch(`/api/knowledge/${knowledge._id.toString()}`,{
                    method: 'DELETE'
                });

                const filteredKnowledges = knowledges.filter((p) => p._id !== knowledge._id);
                setKnowledges(filteredKnowledges);
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <Profile
        name="My"
        desc="Welcome to your profile"
        data={knowledges}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile