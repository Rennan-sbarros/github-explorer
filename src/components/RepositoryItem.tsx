interface RepositoryItemProps { //interface semelhante a "type"
    repository: {
        name: string;
        description: string;
        html_url: string;
    }
}

export function RepositoryItem(props: RepositoryItemProps) {
    return (
        <li>
            <strong>{props.repository.name}</strong>
            <p>{props.repository.description}</p>

            <button>
                <a href={props.repository.html_url}>
                    Acessar repositório    
                </a>    
            </button>     
        </li>
    );
}