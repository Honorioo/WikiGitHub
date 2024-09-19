import { useState } from 'react';
import gitlogo from '../assets/github-pages-logo-repository-fork-github-86eddab19cbc3ae293ada0fe0fb9e27d.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import { api } from '../services/api';

import {Container} from './styles'

function App() {
  
  const [currentRepo, setCurrentRepo] = useState('')
  const[repos, setRepos] = useState([])
  
  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);

        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }
      }
      alert('Repositório já existente');
    } catch (error) {
        alert('Erro ao buscar repositório. Verifique o nome do repositório.');
    }
  };

  const handleRemoveRepo = async(id) => {
    console.log('Removendo Registro', id)

    const remove = repos.filter(repo => repo.id !== id)
    setRepos(remove)
  }


  return (
    <Container>
      <img src={gitlogo} alt="GitHub Logo" width={72} height={72}/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
