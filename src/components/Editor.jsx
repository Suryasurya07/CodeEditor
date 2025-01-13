import React, { useState, useEffect } from 'react';
import ConfettiEffect from './ConfettiEffect';
import Header from './Header'; 

const Editor = () => {
  const [editorTheme, setEditorTheme] = useState(() => {
   
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light'; 
  });

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isConfettiVisible, setConfettiVisible] = useState(false); 

 
  useEffect(() => {
    localStorage.setItem('theme', editorTheme);
  }, [editorTheme]);

  
  useEffect(() => {
    const savedCode = localStorage.getItem('code');
    if (savedCode) {
      setCode(savedCode);  
      const iframe = document.getElementById('onecompiler-embed');
      if (iframe && iframe.contentWindow) {
        const iframeOrigin = new URL(iframe.src).origin; 
        iframe.contentWindow.postMessage({ code: savedCode }, iframeOrigin);
      }
    }
  }, []);

  
  const toggleTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  
useEffect(() => {
  const messageHandler = (event) => {
    const iframe = document.getElementById('onecompiler-embed');
    const iframeOrigin = iframe ? new URL(iframe.src).origin : '';

    if (event.origin === iframeOrigin && event.data) {
      console.log('Received message from OneCompiler:', event.data);

      
      if (event.data.files && event.data.files.length > 0) {
        const newCode = event.data.files[0].content;
        handleIframeCodeChange(newCode);
      }

      
      if (event.data.result) {
        const executionResult = event.data.result.output || 'No output';
        setOutput(executionResult);

        
        const isSuccessful = executionResult && !executionResult.toLowerCase().includes('error');

      
        if (isSuccessful) {
          setConfettiVisible(true);
          setTimeout(() => setConfettiVisible(false), 5000); 
        } else {
          setConfettiVisible(false); 
        }
      }
    } else {
      console.warn('Ignored message from unknown source:', event.origin);
    }
  };

  window.addEventListener('message', messageHandler);

  return () => {
    window.removeEventListener('message', messageHandler);
  };
}, []);

  

  
  useEffect(() => {
    setEditorTheme(editorTheme);
  }, [editorTheme]);

  
  const handleRunCode = () => {
    const iframe = document.getElementById('onecompiler-embed');
    if (iframe && iframe.contentWindow) {
      const iframeOrigin = new URL(iframe.src).origin;
      iframe.contentWindow.postMessage({ eventType: 'triggerRun' }, iframeOrigin);
      console.log('Sent runCode action to iframe');
  
      
      setConfettiVisible(true);
      setTimeout(() => setConfettiVisible(false), 5000); 
    }
  };
  

  
  const handleIframeCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem('code', newCode);  
    console.log('Code saved to localStorage:', newCode); 
  };

  
  const sendCodeToIframe = () => {
    const iframe = document.getElementById('onecompiler-embed');
    if (iframe && iframe.contentWindow) {
      const targetOrigin = window.location.hostname === 'localhost' 
        ? 'http://localhost:5173' // Use localhost origin during development
        : 'https://onecompiler.com'; // Use production origin when deployed
      iframe.contentWindow.postMessage({ code: code }, targetOrigin);
    }
  };

  useEffect(() => {
    sendCodeToIframe(); 
  }, [code]);

  
  useEffect(() => {
    if (code) {
      localStorage.setItem('code', code);
      console.log('Auto-saved code to localStorage:', code);
    }
  }, [code]); 

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-2xl">
      
      <ConfettiEffect isConfettiVisible={isConfettiVisible} />

      
      <Header theme={editorTheme} toggleTheme={toggleTheme} handleRunCode={handleRunCode} />

      
      <div className="mb-6">
        <iframe
          id="onecompiler-embed"
          src={`https://onecompiler.com/embed/java?hideRun=true&listenToEvents=true&theme=${editorTheme}`}
          style={{ border: 'none', borderRadius: '12px' }}
          width="100%"
          height="500px"
          title="OneCompiler Editor"
          className="rounded-xl"
        ></iframe>
      </div>

      
      <div className="mt-6 flex flex-col gap-6">
        
        {output && (
          <div className="mt-8 p-6 bg-white border-2 border-gray-300 rounded-xl shadow-lg">
            <h3 className="font-semibold text-xl text-gray-700 mb-4">Execution Output:</h3>
            <pre className="text-sm text-gray-800 break-words whitespace-pre-wrap">{output.trim() || 'No output available.'}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
