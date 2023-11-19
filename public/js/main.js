const socket=io();


socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

});  

const chatForm=document.getElementById("chat-form");
//catching data when the form is submitted and emitting to server;
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg=e.target.elements.msg.value;
 
    socket.emit('chatMsg',msg);
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
document.querySelector('.chat-messages').appendChild(div);

}