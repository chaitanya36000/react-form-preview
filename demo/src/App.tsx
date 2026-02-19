import { RenderForm, PurePreview } from '@/PreviewMode'
import { useState } from 'react'

function App() {
    const [fields] = useState([
        { id: '1', type: 'heading', content: 'Demo Form Builder' },
        { id: '2', type: 'paragraph', content: 'This is a live preview of your form component working locally.' },
        { id: '3', type: 'text', label: 'Full Name', placeholder: 'Enter your name', required: true },
        { id: '4', type: 'email', label: 'Email Address', placeholder: 'your@email.com' },
        {
            id: '6',
            type: 'checkbox',
            label: 'Interests',
            options: [
                { id: 'cb1', label: 'Design' },
                { id: 'cb2', label: 'Coding' }
            ]
        },
        {
            id: '7',
            type: 'radio',
            label: 'Frequency',
            options: [
                { id: 'r1', label: 'Daily' },
                { id: 'r2', label: 'Weekly' }
            ]
        },
        { id: '8', type: 'file', label: 'Upload Resume' }
    ])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">Local Development Preview</h1>
                        <p className="mb-8 text-gray-600">
                            Any changes you make to <code>src/PreviewMode.tsx</code> will reflect here immediately.
                        </p>
                    </div>
                    <div className="h-[800px] flex px-10 py-5">
                        <RenderForm fields={fields} classes={{
                            fieldContainer: "space-y-1"
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
