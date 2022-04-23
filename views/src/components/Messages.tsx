import { Box } from '@chakra-ui/react';
import OuterMessage from 'components/OuterMessage';
import UserMessage from 'components/UserMessage';
import { useSocketContext } from 'context/SocketContext';
import React from 'react';

const components: React.FC = () => {
  const { messages } = useSocketContext()

  return (
    <Box w="50%" minW="380px" h="55%" bg="bisque" borderRadius={"20px"} marginY="20px" overflowY={"scroll"} padding="10px" display={"flex"} flexDirection="column">

      {messages.map((message, index) => {
        if (message.user === "You") {
          return <UserMessage message={message} key={index} />
        } else {
          return <OuterMessage message={message} key={index} />
        }
      })}

    </Box>
  );
}

export default components;