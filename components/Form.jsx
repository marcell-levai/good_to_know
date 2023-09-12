import Link from "next/link";

const Form = ({ type, knowledge, setKnowledge, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='green_gradient'>{type} Knowledge</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} and share amazing knowledges with everyone.
        </p>

        <form
            onSubmit={handleSubmit}
            className='mt-10 w-full flex flex-col gap-7 glassmorphism'
        >
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Title {` `}
                </span>

                <input
                    value={knowledge.title}
                    onChange={(e) => setKnowledge({ ...knowledge,
                    title: e.target.value})}
                    placeholder="Create a title for your knowledge"
                    required
                    className='form_input glassmorphism'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Knowledge description
                </span>

                <textarea
                    value={knowledge.description}
                    onChange={(e) => setKnowledge({ ...knowledge,
                    description: e.target.value})}
                    placeholder="Write your knowledge here..."
                    required
                    className='form_textarea glassmorphism'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Tag {` `}
                </span>

                <input
                    value={knowledge.tag}
                    onChange={(e) => setKnowledge({ ...knowledge,
                    tag: e.target.value})}
                    placeholder="#tag"
                    required
                    className='form_input glassmorphism mb-10'
                />

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href="/" className='px-5 py-1.5 text-sm bg-gray-500 rounded-full text-white'>
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-green-500 rounded-full text-white'
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </label>
            
        </form>
    </section>
  )
}

export default Form