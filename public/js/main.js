const socket=io();
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');

const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

//join room
console.log(username,room); 
socket.emit("joinRoom",{username,room});



socket.on('message',message=>{
    // console.log(message);
    outputMessage(message);
    //scroll
chatMessages.scrollTop=chatMessages.scrollHeight;

});  

socket.on('roomUsers',({room, users})=>{

    outputRoom(room);
    outputRoomUsers(users);

})

const chatForm=document.getElementById("chat-form");
//catching data when the form is submitted and emitting to server;
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg=e.target.elements.msg.value;
 
    socket.emit('chatMsg',msg);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

//displaying message on the front end;
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=
`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
chatMessages.appendChild(div);

}

function outputRoom(room){
     roomName.innerHTML=room;

}

function outputRoomUsers(users){
    userList.innerHTML=`
    ${users.map(user =>`<li> ${user.username}</li>`).join('')}
    `;
}
