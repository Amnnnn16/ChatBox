const socket=io();
const chatMessages=document.querySelector('.chat-messages');


socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //scroll
chatMessages.scrollTop=chatMessages.scrollHeight;

});  

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
`<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`;
chatMessages.appendChild(div);

}


