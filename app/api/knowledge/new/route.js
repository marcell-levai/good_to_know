import { connectToDB } from "@utils/database";
import Knowledge from "@models/knowledge";

export const POST = async (req) =>{
    const { userId, title, description, tag } = await req.json();

    try{
        await connectToDB();
        const newKnowledge = new Knowledge({
            creator: userId,
            title,
            description,
            date: Date(),
            tag
        });

        await newKnowledge.save();

        return new Response(JSON.stringify(newKnowledge), { status: 201 })
    } catch (error){
        return new Response("Failed to create a new knowledge");
    }
}