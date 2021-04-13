import { Button, IconButton } from "@material-ui/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from "styled-components";
import { auth, db } from "../firebase";
import EmailValidator from "email-validator";
import CloseIcon from '@material-ui/icons/Close';

  
  
  function NewChatPopup({ NchatPopup, setNchatPopup }) {

    const [border, setBorder] = useState(0);

    const [user] = useAuthState(auth);

    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);


    const [input, setInput] = useState('');

    const createChat = () => {
    
        if (!input) return null;
    
        if(
            EmailValidator.validate(input) && 
            !chatAlreadyExists(input) && 
            input !== user.email) {
            // We need to add the chat into the DB 'chats' collection if it doesnt already exist and is valid
            db.collection('chats').add({
                users: [user.email, input],
            });
            setBorder(2);

        } else if (!EmailValidator.validate(input)) {
            setBorder(1);
        } else if(chatAlreadyExists(input)) {
            setBorder(1);
        } else if (input == user.email) {
            setBorder(1);
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
        var i = 0;

        chatsSnapshot?.docs.find(
            (chat) => {
                chat.data().users.find((user) => user === recipientEmail)?.length > 0 ? i += 1 : null;
            }
        );


        if (i>0) {return true;} else {return false;}
    };

      return (
          <Container NchatPopup={NchatPopup}>
          <IconButton>    
            <CloseIcon onClick={() => setNchatPopup(false)} />  
          </IconButton>
                <Input value={input} onInput={(e) => setInput(e.target.value)} border={border} onSubmit={createChat} />
                <NewChatButton onClick={createChat}> Nouveau E-CHat </NewChatButton>
          </Container>
      )
  }
  
  export default NewChatPopup;

  const Container = styled.div`
    opacity: ${({NchatPopup}) => NchatPopup ? '1' : '0'};
    width: 300px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    box-shadow: 0px 4px 14px 0px #00f7f3;
    z-index: 999;
    transform: translate(-50%, -50%);
    transition: 1s;
    display: grid;
    place-items: center;
  `;

  const Input = styled.input`
    outline: none;
    font-size: 1.2em;
    width: 90%;
    border-radius: 9px;
    border: ${({ border }) => border == 1 ? '2px solid red' : border == 2 ? ' 2px solid #5eff19 ' : 'none'};
    background-color: whitesmoke;
    padding: 5px;
  `;

  const NewChatButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
  