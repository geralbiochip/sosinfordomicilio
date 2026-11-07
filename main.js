const WHATSAPP="351000000000";
const products=[
{id:1,name:"Portátil recondicionado",category:"portateis",price:0,description:"Portátil recondicionado, preço e especificações sob consulta.",image:"img/placeholder.svg"},
{id:2,name:"Desktop sob consulta",category:"portateis",price:0,description:"Desktop novo ou recondicionado, configurado conforme necessidade.",image:"img/placeholder.svg"},
{id:3,name:"SSD SATA/NVMe",category:"componentes",price:0,description:"Upgrade de disco para melhorar velocidade e capacidade.",image:"img/placeholder.svg"},
{id:4,name:"Memória RAM",category:"componentes",price:0,description:"Memória para portátil ou desktop. Compatibilidade verificada antes da compra.",image:"img/placeholder.svg"},
{id:5,name:"Rato e teclado",category:"acessorios",price:0,description:"Periféricos com fio ou sem fios, para casa e escritório.",image:"img/placeholder.svg"},
{id:6,name:"Router Wi‑Fi",category:"redes",price:0,description:"Router, repetidor ou equipamento para melhorar a cobertura Wi‑Fi.",image:"img/placeholder.svg"}
];
let cart=JSON.parse(localStorage.getItem("infordomicilio_cart")||"[]");
function money(v){return v.toFixed(2).replace(".",",")+" €"}
function renderProducts(cat="todos"){
const box=document.getElementById("products");if(!box)return;
box.innerHTML=products.filter(p=>cat==="todos"||p.category===cat).map(p=>`
<article class="product">
<img src="${p.image}" alt="${p.name}">
<div class="product-body"><h3>${p.name}</h3><p>${p.description}</p>
<p class="price">${p.price?money(p.price):"Preço sob consulta"}</p>
<button class="btn btn-primary" onclick="addToCart(${p.id})">Adicionar</button>
<a class="btn btn-whatsapp" target="_blank" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá, tenho interesse no produto: "+p.name)}">WhatsApp</a>
</div></article>`).join("");
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
b.classList.add("active");renderProducts(b.dataset.cat);
}));
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);save();openCart()}
function save(){localStorage.setItem("infordomicilio_cart",JSON.stringify(cart));updateCart()}
function updateCart(){
const count=document.getElementById("cart-count");if(count)count.textContent=cart.length;
const items=document.getElementById("cart-items");if(!items)return;
items.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.name}</span><button onclick="removeItem(${i})">Remover</button></div>`).join(""):"<p>O carrinho está vazio.</p>";
const total=cart.reduce((s,p)=>s+p.price,0);
document.getElementById("cart-total").textContent=money(total);
const msg="Olá Infordomicílio, quero encomendar:\n"+cart.map(p=>"- "+p.name).join("\n");
const link=document.getElementById("whatsapp-order");
if(link)link.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
function removeItem(i){cart.splice(i,1);save()}
function openCart(){document.getElementById("cart").classList.remove("hidden");updateCart()}
function closeCart(){document.getElementById("cart").classList.add("hidden")}
function sendWhatsApp(e){e.preventDefault();
const n=nome.value,t=telefone.value,s=servico.value,m=mensagem.value;
const text=`Olá Infordomicílio, o meu nome é ${n}.\nTelefone: ${t}\nServiço: ${s}\nMensagem: ${m}`;
window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank");
}
renderProducts();updateCart();