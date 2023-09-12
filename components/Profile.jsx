import KnowledgeCard from "./KnowledgeCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            <span className='green_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>
            {desc}
        </p>

        <div className='mt-10 knowledge_layout'>
            {data.map((knowledge) => (
                <KnowledgeCard
                    key={knowledge._id}
                    knowledge={knowledge}
                    handleEdit={() => handleEdit && handleEdit
                    (knowledge)}
                    handleDelete={() => handleDelete && handleDelete
                    (knowledge)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile