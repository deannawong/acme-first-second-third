const slots= ['first','second','third'];

const users=[
    {id: 1, name: 'moe', slot: 'first'},
    {id: 2, name: 'larry', slot: 'second'},
    {id: 3, name: 'curly', slot: 'third'},
    {id: 4, name: 'lucy', slot: 'third', selected: true}
];

const lists=document.querySelector(".lists");


const renderLists=()=>{ 
    slots.forEach((slotName)=>{
        const currentSlot = document.getElementById(`${slotName}`);
        currentSlot.innerHTML=''

        const leftButton=document.createElement('button');
        leftButton.innerHTML='<';
        leftButton.className=`${slotName}`;
        leftButton.id='left'
        currentSlot.appendChild(leftButton)

        const rightButton=document.createElement('button');
        rightButton.innerHTML='>';
        rightButton.className=`${slotName}`;
        rightButton.id='right';
        currentSlot.appendChild(rightButton);

        const title=document.createElement('h2')
        title.innerHTML=`${slotName.toUpperCase()}`
        currentSlot.appendChild(title);

        users.forEach((user)=>{
            if(slotName===user.slot){
                const card=document.createElement('div');
                card.innerHTML=`${user.name}`;
                card.className=`card ${user.slot} ${user.selected? "selected":''}`;
                card.id=`${user.id}`;

                currentSlot.appendChild(card);
            }
        })
    })
}

lists.addEventListener('click',(ev)=>{
    ev.preventDefault();
    
    if(ev.target.className.includes('card')){

        ev.target.classList.toggle("selected");

        users.forEach((user)=>{
            if(`${user.id}`===ev.target.id){
                user.selected=!user.selected;

            }
        })
    }
    

    if(ev.target.nodeName==='BUTTON'){
        const listSelected=ev.target.className;

        users.forEach((user)=>{
            if(user.selected){
                if(user.slot===listSelected){
                                    

                let direction=0;

                if(ev.target.id==='left'){direction = -1};
                if(ev.target.id==='right'){direction = 1};

                user.slot=slots[slots.indexOf(user.slot)+direction]

                }

            }
        })

        renderLists();
    }

})

renderLists();
