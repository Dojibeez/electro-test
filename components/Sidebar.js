import styled from 'styled-components';
import React, { useState } from 'react'
import { Button, IconButton, Avatar } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';
import { blue, green } from '@material-ui/core/colors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import NewChatPopup from './NewChatPopup';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';


const Sidebar = () => {

    const [user] = useAuthState(auth);

    const [menu, setMenu] = useState(true);

    const showMenu = () => setMenu(!menu);

    const [NchatPopup, setNchatPopup] = useState(false);

    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);

    const [chatsSnapshot] = useCollection(userChatRef);





    return (
        <Container>
            <IconButton onClick={showMenu} >
                {!menu ? <DehazeIcon style={{ fontSize: 40, color:blue[50] }} /> 
                : <CloseIcon style={{ fontSize: 40, color:blue[50] }} />}
            </IconButton>
            <MenuContainer menu={menu}>
                <Menu>
                    <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                    <NewElectroChat onClick={() => setNchatPopup(true)}> Nouveau Electro Chat </NewElectroChat>
                    <ChatUserChoice>
                        {chatsSnapshot?.docs.map(chat => (
                            <Chat key={chat.id} id={chat.id} users={chat.data().users} setMenu={setMenu} menu={menu} />
                        ))}
                    </ChatUserChoice>
                </Menu>
            </MenuContainer>
            <NewChatPopup NchatPopup={NchatPopup} setNchatPopup={setNchatPopup} />
        </Container>
    )
}

export default Sidebar;



const Container = styled.div`
    z-index: 999;
`;

const MenuContainer = styled.div`
    background-color: #4a4a4a;
    opacity: ${ ({ menu }) => menu ? '1' : 0};
    position: fixed;
    left: ${ ({ menu }) => menu ? '0%' : '-100%' };
    width: 80%;
    height: 100vh;
    
    transition: 1s;
    ::-webkit-scrollbar {
        display: none;
    }

    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const Menu = styled.div`
    z-index: 10;
    background-color: #4a4a4a;
    flex: 3;
    text-align: center;
    align-items: center;
    justify-content: center;

`;

const NewElectroChat = styled(Button)`
    width: 90%;
    font-size: 2vh;
    &&& {
        background-color: whitesmoke;
    }
    &&&:hover {
        color: #00f7f3;
        background-color: transparent;
    }
`;

const ChatUserChoice = styled.div`
    margin-top: 10px;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    margin-bottom: 10px;
    margin: 5px;
    :hover {
        opacity: 0.8;
    }
`;








