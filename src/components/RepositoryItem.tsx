interface RepositoryItemProps{
  repository:{
    name: string;
    description: string;
    html_url: string;
  }
}
export function RepositoryItem(props:RepositoryItemProps) {
  //props puxa todas as propriedades que vem do componente pai (RepositoryList) 
  //props tem o formato RepositoryItemProps
    return(
        <li>
          <strong>{props.repository.name}</strong> 
          <p>{props.repository.description}t</p>
          <a href="">{props.repository.html_url}</a>
        </li>
    ); 
  //props.repository.name -> acessa a propriedade (puxando do parâmetro props do pai RepositoryList) name dentro da key repositort 
}