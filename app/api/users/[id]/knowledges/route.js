import Knowledge from "@models/knowledge";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const knowledges = await Knowledge.find({
            creator: params.id
        }).populate('creator');
        
        return new Response(JSON.stringify(knowledges), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch knowledges", { status: 500 })
    }
} 