import React, { useState, useEffect  } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css'
import logo_whtas from './img/whatsapp.png'
import logo_insta from './img/instagram.png'
import logo from './img/Minha_logo.png'


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
  const [data_entrega , setData_entrega] = useState('')

  const [imageLogo , setImageLogo] = useState(null);

 // Salvar dados no localStorage ao atualizar os estados
 useEffect(() => {
  localStorage.setItem('telefone', telefone);
  localStorage.setItem('Aroba_insta', Aroba_insta);
  localStorage.setItem('texto_capa', texto_capa);
  localStorage.setItem('Pacote1', Pacote1);
  localStorage.setItem('Pacote2', Pacote2);
  localStorage.setItem('Pacote3', Pacote3);
  localStorage.setItem('form_pagamento', form_pagamento);
  localStorage.setItem('text_complementar', text_complementar);
}, [telefone, Aroba_insta, texto_capa, Pacote1, Pacote2, Pacote3, form_pagamento, text_complementar]);

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
    <div  className='div_principal'>

      <div className="header">
      <div  className='Form'>
         <span>
            Preencha os Dados abaixo para criação  da Capa
         </span> <br/>
        {/* <input   type="text"   placeholder="Nome Fotografo(a)"  value={nome_fotografo} onChange={(e) => setFotografo(e.target.value)}/>
        <input   type="text"   placeholder="Telefone "  value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
        <input   type="text"   placeholder="Instagran "  value={Aroba_insta} onChange={(e) => setAroba_insta(e.target.value)}/> */}
        <input   type="text"   placeholder="Informação Aluno "  value={dados_aluno} onChange={(e) => setDados_aluno(e.target.value)}/>
        {/* <input   type="text"   placeholder="texto_capa "  value={texto_capa} onChange={(e) => setTexto_capa(e.target.value)}/>
        <br/>
        <span>Selecione sua Logo</span>
        <br/>
        <input type="file" accept="image/*" onChange={handleImageLogo} /> */}
        <br/>
        {/* <br/>
         <span> Preencha com a informacao dos Pacotes </span>
         <br/>
        <input   type="text"   placeholder="Pacote1 "  value={Pacote1} onChange={(e) => setPacote1(e.target.value)}/>
        <input   type="text"   placeholder="Pacote2 "  value={Pacote2} onChange={(e) => setPacote2(e.target.value)}/>
        <input   type="text"   placeholder="Pacote3 "  value={Pacote3} onChange={(e) => setPacote3(e.target.value)}/>
        <input   type="text"   placeholder="Pacote4 "  value={Pacote4} onChange={(e) => setPacote4(e.target.value)}/>
        <br/>
        <br/> */}
        {/* <span>informe a formas pagamento sep. por '-'</span> <br/> */}
        {/* <input   type="text"   placeholder="form_pagamento "  value={form_pagamento} onChange={(e) => setForm_pagamento(e.target.value)}/>
        <input   type="text"   placeholder="text_complementar "  value={text_complementar} onChange={(e) => SetText_complementar(e.target.value)}/> */}

        <input   type="text"   placeholder="Data Entrega "  value={data_entrega} onChange={(e) => setData_entrega(e.target.value)}/>

     


      <br/>


      </div>


      <div  className='Form'>
         {/* <span>  Preencha os Dados abaixo para criação da Grid</span> */}
          <br/>
        {/* <input   type="text"   placeholder="Texto Complementar"  value={name} onChange={(e) => setName(e.target.value)}/> */}
         <span> Escola até 35 fotos.</span>
        <input  type="file"  accept="image/*" multiple   onChange={handleImageChange}  />

      <br/>

      <button onClick={generatePDF}>Gerar PDF</button>
      </div>


      </div>
      {/* Área onde as imagens e o grid são renderizados */}
      <div className="a4-page_capa">
         <div  className='nav'>

           <div className='nav_nome_fotografo'>
           {/* <img  className='logo_cabecalho'  src={imageLogo} /> */}
            <img  className='logo_cabecalho' src={logo}/>
           {/* <span>{nome_fotografo} </span> */}
           <span>DIOVANA LIMA FOTOGRAFIA </span>
           </div>

           <div className='nav_tel_insta'>
              <div className='dados'>
                 <img  className= 'logos' src={logo_whtas} alt="Logo"/>
                 {/* <span>{telefone}</span> */}
                  <span>(46)99132-1472  </span>
              </div>
              <div  className='dados'>
                <img className= 'logos' src={logo_insta} alt="Logo" />
                  {/* <span>{Aroba_insta}</span> */}
                  <span>@diovanna_lima  </span>

              </div>

          </div>
         </div>


          <div nav_meio>
             <div className='nav_meio_aluno'>

                <span>{dados_aluno}</span>
             </div>
             <div className='nav_meio_texto'>
             <span style={{color:'red'}}>Senhores pais ou responsáveis, o ensaio fotográfico ficou lindo!</span>
             {/* <h3> {texto_capa} </h3> */}
             <h3>Aproveite e também garanta essa linda recordação, escolha as
             fotos com carinho, seu filho(a) merece!</h3>


             <span className='dados_pais'> NOME DO RESPONSAVEL:_________________________________</span> <br/>
             <span className='dados_pais'> WHATSAPP DO RESPONSAVEL:_______________________________</span>

             </div>


          </div>
           <div className='div_Pacotes'>
             <div className='nav_meio_aluno' >
                <span>MARQUE O PACOTE DESEJADO :</span>

             </div>

             <div className='pacote'>
             <div className="teck_pacote"></div>
             {/* <span className='text_pacote'>{Pacote1}</span> */}
              <span className='text_pacote'>PACOTE 1: R$50,00 (1 fotão 20x25 + 1 foto menor 10x15
                + brinde as 2 fotos em arquivo digital direto no seu WhatsApp).</span>
            </div>
      	      <br/>
             <div className='pacote'>
             <div className="teck_pacote"></div>
             {/* <span className='text_pacote'>{Pacote2}</span> */}
             <span className='text_pacote'>PACOTE 2: R$80,00 (1 fotão 20x25 + 4 fotos menores 10x15
              + brinde as 4 fotos em arquivo digital direto no seu WhatsApp).</span>
             </div>
             <br/>

             <div className='pacote'>
             <div className="teck_pacote"></div>
             {/* <span className='text_pacote'>{Pacote3}</span> */}
             <span className='text_pacote'>PACOTE 3: R$120,00 (1 quadro com foto 20x30 + 5 fotos menores 10x15
              + brinde as 5 fotos em arquivo digital direto no seu WhatsApp).</span>
             </div>
             <br/>
             <div className='pacote'>
             <div className="teck_pacote"></div>
             {/* <span className='text_pacote'>{Pacote4}</span> */}
             <span className='text_pacote'>PACOTE 4: R$160,00 (1 quadro com foto 20x30 + 10 fotos menores
              10x15 + brinde as 10 fotos em arquivo digital direto no seu WhatsApp).</span>
             </div>



           </div>

           <div className='Form_pagamento'>
             <div className='nav_meio_aluno' > <spna>FORMAS DE PAGAMENTO:</spna></div>
              <div className='Div_pagamento_text'>
              <h2>PIX - DINHEIRO - CARTAO DE DÉBITO - CARTAO DE CRÉDITO</h2>
              {/* <h2>{form_pagamento}</h2> */}
              <br/>
              <h2 style={{ color: 'red'}}>Observação:  PACOTES 3 E 4 , PARCELAMOS NO CARTAO DE CRÉDITO EM   ATÉ 4X SEM JUROS
              </h2>
              {/* <h2>{text_complementar}</h2> */}
              </div>


           </div>
           <div className='roda_pes'>
             <h2>PAGAMENTO E ENTREGA DAS FOTOS DIA {data_entrega}</h2>
           </div>
      </div>

      <div className="a4-page">
        <div className='grid_titulo'>
        <span>{dados_aluno}</span>
        <h3>MARQUE  COM X AS FOTOS ESCOLHIDAS</h3>
        {/* {name &&  <h2> {name}</h2>} */}
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
