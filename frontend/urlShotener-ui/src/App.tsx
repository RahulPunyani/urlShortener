import { useEffect, useState } from 'react'
import './App.css'
import { Button, HStack, Input, Text } from '@chakra-ui/react'
import axios from 'axios';

function App() {

  const [inputText, setInputText] = useState<undefined | string>();
  const [responseText, setResponseText] = useState<undefined | string>();

  useEffect(() => {
    
  }, [])

  const handleConvertButtonClick = () => {
    axios.post("http://localhost:3000/shorten", { "longUrl": inputText}).then((response) => {
      const shortUrl: string = response.data.shortUrl;
      setResponseText(shortUrl);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  return (
   
    <HStack gap="2">
      <Input size='lg' placeholder="Enter original URL" onChange={(event) => setInputText(event.target.value)}></Input>
      <Button color='black' onClick={handleConvertButtonClick} >Convert</Button>
      <Text>{responseText}</Text>
    </HStack>
  )
}

export default App
