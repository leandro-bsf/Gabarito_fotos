import React, { useState, useSyncExternalStore } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css'
import logo_whtas from './img/whatsapp.png'
import logo_insta from './img/instagram.png'
import userEvent from '@testing-library/user-event';

function ImageUploader() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState(''); // Armazena o nome inserido pelo usuário
  const[nome_fotografo , setFotografo] = useState('')
  const [ telefone , setTelefone] = useState('')
  const [Aroba_insta , setAroba_insta] = useState('')
  const [dados_aluno , setDados_aluno] = useState('')
  const [texto_capa , setTexto_capa] = useState('')
  const[Pacote1 , setPacote1] = useState('')
  const[Pacote2 , setPacote2] = useState('')
  const[Pacote3 , setPacote3] = useState('')
  const[Pacote4 , setPacote4] = useState('')
  const[form_pagamento , setForm_pagamento]= useState('')
  const[text_complementar , SetText_complementar] = useState('')

  const [imageLogo , setImageLogo] = useState(null);

  const handleImageLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageLogo(reader.result); // Carrega a imagem como base64
      };
      reader.readAsDataURL(file);
    }
  };



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      return; // Se nenhum arquivo foi selecionado, não faz nada.
    }

    const imageList = files.map((file) => ({
      name: file.name,           // Nome do arquivo
      url: URL.createObjectURL(file), // URL da imagem
    }));
    
    setImages(imageList); // Atualiza o estado com as imagens selecionadas.
  };
  const generatePDF = () => {
    const pageCapa = document.querySelector('.a4-page_capa'); // Seleciona a capa
    const pageContent = document.querySelector('.a4-page'); // Seleciona a página de conteúdo
  
    const pdf = new jsPDF('portrait', 'px', 'a4'); // Cria o PDF no formato A4
  
    // Função auxiliar para adicionar uma página ao PDF
    const addPageToPDF = (page, isLastPage) => {
      return html2canvas(page, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        if (!isLastPage) {
          pdf.addPage(); // Adiciona uma nova página ao PDF
        }
      });
    };
  
    addPageToPDF(pageCapa, false).then(() => {
      addPageToPDF(pageContent, true).then(() => {
        // Usa o valor do input 'dado_aluno' como nome do arquivo PDF
        pdf.save(`${dados_aluno}.pdf`); // Salva o arquivo PDF com o nome do aluno
      });
    });
  }

  return (
    <div>
      {/* Campo para o usuário inserir o nome */}
      <div className="header">
      <div  className='Form'>
         <span>
            Preencha os Dados abaixo para criação  da Capa
         </span> <br/>
        <input   type="text"   placeholder="Nome Fotografo(a)"  value={nome_fotografo} onChange={(e) => setFotografo(e.target.value)}/>
        <input   type="text"   placeholder="Telefone "  value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
        <input   type="text"   placeholder="Instagran "  value={Aroba_insta} onChange={(e) => setAroba_insta(e.target.value)}/>
        <input   type="text"   placeholder="Informação Aluno "  value={dados_aluno} onChange={(e) => setDados_aluno(e.target.value)}/>
        <input   type="text"   placeholder="texto_capa "  value={texto_capa} onChange={(e) => setTexto_capa(e.target.value)}/>
        <br/>
        <span>Selecione sua Logo</span>
        <br/>
        <input type="file" accept="image/*" onChange={handleImageLogo} />
        <br/>
         <span> Preencha com a informacao dos Pacotes </span>
        <input   type="text"   placeholder="Pacote1 "  value={Pacote1} onChange={(e) => setPacote1(e.target.value)}/>
        <input   type="text"   placeholder="Pacote2 "  value={Pacote2} onChange={(e) => setPacote2(e.target.value)}/>
        <input   type="text"   placeholder="Pacote3 "  value={Pacote3} onChange={(e) => setPacote3(e.target.value)}/>
        <input   type="text"   placeholder="Pacote4 "  value={Pacote4} onChange={(e) => setPacote4(e.target.value)}/>
        <br/>
        <span>informe a formas pagamento sep. por '-'</span>
        <input   type="text"   placeholder="form_pagamento "  value={form_pagamento} onChange={(e) => setForm_pagamento(e.target.value)}/>
        <input   type="text"   placeholder="text_complementar "  value={text_complementar} onChange={(e) => SetText_complementar(e.target.value)}/>

        
      <br/>
     
   
      </div>


      <div  className='Form'>
         <span>
            Preencha os Dados abaixo para criação da Grid
         </span> <br/>
        <input   type="text"   placeholder="Texto Complementar"  value={name} onChange={(e) => setName(e.target.value)}/>
        <input  type="file"  accept="image/*" multiple   onChange={handleImageChange}  />
      <br/>
     
      <button onClick={generatePDF}>Gerar PDF</button>
      </div>

     
      </div>
      {/* Área onde as imagens e o grid são renderizados */}
      <div className="a4-page_capa">
         <div  className='nav'> 
           
           <div className='nav_nome_fotografo'>
           <img  className='logo_cabecalho'  src={imageLogo} />
           <span>{nome_fotografo} </span>
           </div>
        
           <div className='nav_tel_insta'>
              <div className='dados'>
                 <img  className= 'logos' src={logo_whtas} alt="Logo"/>
                 <span>{telefone}</span>  
              </div>
              <div  className='dados'>
                <img className= 'logos' src={logo_insta} alt="Logo" />
                  <span>{Aroba_insta}</span>
              </div>
             
          </div>
         </div>


          <div nav_meio>
             <div className='nav_meio_aluno'>
             
                <span>{dados_aluno}</span>
             </div>
             <div className='nav_meio_texto'>
             <span style={{color:'red'}}>Senhores pais ou responsáveis, o ensaio fotográfico ficou lindo!</span>
             <h3> {texto_capa} </h3>
            
           
             <span> NOME DO RESPONSAVEL:______________________</span> <br/>
             <span> WHATSAPP DO RESPONSAVEL:____________________</span>

             </div>
            

          </div>
           <div className='div_Pacotes'> 
             <div className='nav_meio_aluno' >
                <span>M A R Q U E O P A C O T E D E S E J A D O :</span>

             </div>
           
             <div className='pacote'>
             <div className="teck_pacote"></div>
             <span className='text_pacote'>{Pacote1}</span>
             </div>

             <div className='pacote'>
             <div className="teck_pacote"></div>
             <span className='text_pacote'>{Pacote2}</span>
             </div>


             <div className='pacote'>
             <div className="teck_pacote"></div>
             <span className='text_pacote'>{Pacote3}</span>
             </div>
             
             <div className='pacote'>
             <div className="teck_pacote"></div>
             <span className='text_pacote'>{Pacote4}</span>
             </div>
             


           </div>

           <div className='Form_pagamento'>
             <div className='nav_meio_aluno' > <spna>F O R M A S D E P A G A M E N T O :</spna></div>
              <div className='Div_pagamento_text'>
              <h2>{form_pagamento}</h2>
              <h2>{text_complementar}</h2>
              </div>
         

           </div>
           <div className='roda_pes'>
             <h2>P A G A M E N T O E E N T R E G A D A S F O T O S D I A</h2>
           </div>
      </div>
  
      <div className="a4-page">
        <div className='grid_titulo'>
        {name &&  <h2> {name}</h2>}
        </div>
     
        {images.length > 0 ? (
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <p>{image.name}</p> {/* Nome do arquivo */}
                <div className="small-square"></div> {/* Quadrado pequeno */}
                <img src={image.url} alt={image.name} />
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma imagem selecionada</p>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
