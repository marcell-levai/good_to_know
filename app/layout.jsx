import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Good to know",
    description: 'Share your useful knowledge with others'
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body className='bg-gray-200'>
            <Provider>
                <div className='main'>
                    <div></div>
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout