import Knowledge from "@models/knowledge";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const knowledge = await Knowledge.findById(params.id).populate('creator');
        if(!knowledge) return new Response("Knwoledge not found", { status: 404 })
        
        return new Response(JSON.stringify(knowledge), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch knowledges", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { title, description, tag } = await request.json();
    
    try {
        await connectToDB();

        const existingKnowledge = await Knowledge.findById(params.id);

        if(!existingKnowledge) return new Response("Knowledge not found", { status: 404 })

        existingKnowledge.title = title;
        existingKnowledge.description = description;
        existingKnowledge.tag = tag;
        existingKnowledge.date = Date();

        await existingKnowledge.save();

        return new Response(JSON.stringify(existingKnowledge), { status: 200 })
    } catch (error) {
        return new Response("Failed to update the knowledge", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Knowledge.findByIdAndRemove(params.id);

        return new Response("Knowledge deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete knowledge", { status: 500 })
    }
}