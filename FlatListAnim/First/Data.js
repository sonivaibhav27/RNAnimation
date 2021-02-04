import faker from "faker"
import {Dimensions} from "react-native"

const {width,height} =Dimensions.get("window")
export const makeMagicData=  ()  =>{
    const colors = ["#000","pink","yellow","orange"]
    const returned = []
    for (let i = 0; i < 10; i++){
        let Data = {}
        Data.avatarUrl = faker.image.imageUrl(null,null,null,true),
        Data.userName = faker.name.firstName(),
        Data.background =colors[Math.floor(Math.random() * colors.length)]
        returned.push(Data)
    }

    return returned
    
}


export const SecondExample =()=>{
    const data = []
    for(let i =0;i<3;i++){
        data.push(faker.image.people(width,height))
    }
    return  data
}