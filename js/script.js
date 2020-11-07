(
    function al(win,doc){
        const Html=document.querySelector('html')
    

        const getSTyle=(element,style)=>
    window.getComputedStyle(element).getPropertyValue(style)
        const redColors={
            bg:'#9d0208',
            border:"#9d0220",
        }
        const initialColors={
            bg:getSTyle(Html,'--bg'),
            border:getSTyle(Html,"--border")
          }
        const html={
            element:[...document.querySelector('.tab-links').children],
            el:[...doc.querySelector('.tab-content').children],
            openTab:doc.querySelector('[data-open]')
        }
        const transformKey=key=>"--" + key.replace(/([A-Z])/,"-$1").toLowerCase()
    


        const changeColors=(colors)=>{
      Object.keys(colors).map(key=>{
        return Html.style.setProperty(transformKey(key), colors[key])
      })}
        function RemoveAllActiveClass(){
            html.element.forEach(tab=>{
              tab.className=tab.className.replace(" active","")
            })
        }
    
           function showCurrentTab(id){
            // console.log(id)
            const tabcontent=doc.querySelector('#'+id)
            tabcontent.style.display='block'
            id==='Prepare'? changeColors(initialColors):changeColors(redColors)
          }
        function selectElement(event){
            disable()
            RemoveAllActiveClass()
            const target=event.currentTarget;
            showCurrentTab(target.dataset.id)
            target.className += " active"
        }
        function listenForChanges(){
            html.el.forEach(el=>el.addEventListener('click',selectElement))
        }
        
        function disable(){
            html.element.forEach(element=>{
                element.style.display='none'
            })
        }
        function init(){
            listenForChanges()
            disable()
            html.openTab.click()
        }
        init()
    }
)(window,document)