const familyTree = {
  name:"Bob",
  children:[
    {
      name:"Rob",
      children:[
        {
          name:"Phil",
          children:[]
        },
        {
          name:"Philou",
          children:[]
        },
        {
          name:"Philin",
          children:[]
        },
      ] 
    }
  ]
}
const findByName = (familyTree) => {
  if(familyTree.name !== "Philin"){
    familyTree.children.map(children => findByName(children))
  } else {
    return familyTree.name
  }
}
console.log(findByName(familyTree));