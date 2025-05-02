let nodosCreados = false;

function crearNodos() {
  if (nodosCreados) return;

  const container = document.getElementById('linksContainer');
  const enlaces = [
    { text: 'Gatito1', href: 'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fpurina.com.pe%2Fsites%2Fdefault%2Ffiles%2F2022-10%2FQue_debes_saber_antes_de_adoptar_un_gatito.jpg&imgrefurl=https%3A%2F%2Fpurina.com.pe%2Fpurina%2Fgatos%2Fgatos-en-adopcion-que-saber&docid=sJK8HrZU_-pEMM&tbnid=ihjmbmOc5rfoXM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBsQAA..i&w=940&h=470&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBsQAA' },
    { text: 'Gatito2', href: 'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fi0.wp.com%2Fpuppis.blog%2Fwp-content%2Fuploads%2F2022%2F02%2Fabc-cuidado-de-los-gatos-min.jpg%3Fresize%3D521%252C346%26ssl%3D1&imgrefurl=https%3A%2F%2Fpuppis.blog%2Farticulo%2Fcomo-cuidar-a-un-gato&docid=hnaDE-6tjMVmDM&tbnid=8qdNro25qLabBM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGUQAA..i&w=521&h=346&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGUQAA' },
    { text: 'Gatito3', href: 'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fwww.hola.com%2Fhorizon%2Fsquare%2Fec878ddab16b-cuidardgatito-t.jpg&imgrefurl=https%3A%2F%2Fwww.hola.com%2Fmascotas%2F20180925130054%2Fconsejos-para-cuidar-a-un-gatito-recien-nacido-cs%2F&docid=0Gun1bg1xvUIfM&tbnid=zFCizXfIlVONBM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBYQAA' },
    { text: 'Gatito4', href: 'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529778873920-4da4926a72c2%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2F0aXRvfGVufDB8fDB8fHww&imgrefurl=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fgatito&docid=rtkkmZV4QolcsM&tbnid=bei3qxPTjUBF0M&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECFIQAA..i&w=3000&h=3999&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECFIQAA' },
    { text: 'Gatito5', href: 'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fwww.muyinteresante.com%2Fwp-content%2Fuploads%2Fsites%2F5%2F2022%2F10%2F12%2F6345f4ec4e12b.jpeg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.com%2Fmascotas%2F2822.html&docid=OaZ757N85HIUTM&tbnid=ZFgfph63JgxCRM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGcQAA..i&w=1140&h=855&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGcQAA' },
  ];

  enlaces.forEach((enlace, index) => {
    const a = document.createElement('a');
    a.textContent = enlace.text;
    a.href = enlace.href;
    a.id = `link-${index}`;
    a.target = '_blank';
    container.appendChild(a);
  });

  nodosCreados = true;
}

function modificarNodos() {
  if (!nodosCreados) return alert("Primero debes crear los enlaces.");

  const cambios = [
    'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fimg.buzzfeed.com%2Fbuzzfeed-static%2Fstatic%2F2025-03%2F13%2F18%2Fsubbuzz%2FUjLcjUoUE0.jpg%3Fdownsize%3D700%253A%252A%26output-quality%3Dauto%26output-format%3Dauto&imgrefurl=https%3A%2F%2Fwww.buzzfeed.com%2Fmx%2Fbety_lara%2Ftest-pfps-animales-gatitos-tiernos-estatura&docid=Mu9z-BTbjhDa3M&tbnid=ZWPhpWSAp7NG9M&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBoQAA..i&w=700&h=394&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECBoQAA',
    'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Feq2imhfmrcc.exactdn.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fcute-3106473_640.jpg%3Fstrip%3Dall%26lossy%3D1%26ssl%3D1&imgrefurl=https%3A%2F%2Fnutricionistadeperros.com%2Fimportancia-morder-gatitos%2F&docid=-mTb30yNh6TrkM&tbnid=q-xF9SiYHyHYoM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECDUQAA..i&w=640&h=425&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECDUQAA',
    'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1600357077527-930ccbaf7773%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2F0aXRvc3xlbnwwfHwwfHx8MA%253D%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fgatitos&docid=xvxP_Ed0ORH2ZM&tbnid=z4Yrxlan2GRrgM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECE8QAA..i&w=3000&h=2007&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECE8QAA',
    'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fcomunidad.retorn.com%2Fwp-content%2Fuploads%2Fcache%2F2018%2F09%2Fgatitos%2F1583254719.jpg&imgrefurl=https%3A%2F%2Fcomunidad.retorn.com%2Fcuidados-y-salud%2Fcomo-cuidar-de-mi-gatito-recien-nacido%2F&docid=muJ_KvpnZ0554M&tbnid=sWY3qhC0P4qo8M&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECF8QAA..i&w=1200&h=800&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECF8QAA',
    'https://www.google.com/imgres?q=gatitos&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1345472306%2Fes%2Ffoto%2Fun-hermoso-gatito-de-jengibre-se-sienta-en-botes-humanos-al-atardecer-al-aire-libre-el.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DcFZudSbqRlHQkmbLhThMfrYau9e_s2YmRUfC2oz-3hs%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Fgatitos-de-un-mes&docid=ZJQegRw9KSNOCM&tbnid=y_QBTDEcjrN0FM&vet=12ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGgQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwiS5M2ItYONAxXorZUCHW3wEh0QM3oECGgQAA',
  ];

  const log = document.getElementById('log');
  log.innerHTML = ''; // limpiar log anterior

  cambios.forEach((nuevoHref, index) => {
    const a = document.getElementById(`link-${index}`);
    const anterior = a.href;
    a.href = nuevoHref;

    const li = document.createElement('li');
    li.textContent = `Nodo #${index + 1} actualizado: ${anterior} → ${nuevoHref}`;
    log.appendChild(li);
  });
}
