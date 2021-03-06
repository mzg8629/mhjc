var React = require('react');
var reactRedux = require('react-redux')
require("./fileexplorer.scss");
var Redux=require("redux");
var actions=require("../../cms/my_cms/redux/actions.js");
var ContextMenu=require("../contextmenu/my_cms_contextmenu.js");
var Modal=require("../../react/modal/modal.js");

var connect=reactRedux.connect,provider =reactRedux.Provider;

class fileexplorer extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){

    }
    getExtensions(ext){
        switch (ext){
            case "js":
            case "css":
            case "ftl":
            case "html":
            case "docx":
                return 'txt';
            case 'jpg':
            case 'png':
            case 'ico':
                return 'pic';
            default :
                return 'folder';
        }
    }

    createSingleF(item,fn,props){
      function onContextMenu(v,e){
          props.menuClick({left:e.clientX,top:e.clientY,isFile:$(e.target).parent().attr("data-isfile"),path:v});
         e.preventDefault();
      }
      function  itemClick(e){
          $(e.target).parent().parent().find(">li").removeClass('selected');
          $(e.target).parent().addClass('selected');
        }
      function itemDbClick(v,e){
             props.folderClick(v,$(e.target).parent().attr("data-isfile"));
            var ul=$('#tree [data-path="'+v+'"]').parent().children("ul");
            if( ul.children().length>0){
                ul.toggle(100);
                var t=ul.parent();
                t.hasClass("closed")?t.removeClass("closed").addClass("expand"):t.removeClass("expand").addClass("closed");
            }
        }
        var c="thumbnail "+fn(item.value.split('.')[1]);
        return  (<li onContextMenu={onContextMenu.bind(this,item.value)} onDoubleClick={itemDbClick.bind(this,item.value)}  data-isfile={item.isFile}  onClick={itemClick.bind(this)} key={item.text}>
            <div className={c}></div>
            <div className="name">{item.text}</div>
        </li>)
    }
    createFolder(folderInfo){
        var createSingleFv=this.createSingleF;
        var getExtensions=this.getExtensions;
        var props=this.props;
        if(folderInfo.child){
            return folderInfo.child.map(function(item,index){
                return  createSingleFv(item,getExtensions,props);
            });
        }else{
            return  createSingleFv(folderInfo);
        }
    }
    render(){
       var c=" fileexplorer "+(this.props.isShow?"":" display_n")
           ,modal=this.props.modal
           ,selectFolder=this.props.selectFolder, list='';

        selectFolder.child&&(list=this.createFolder(selectFolder));
        return (
            <div id="fileexplorer" className={c} style={{width:'100%',height:'100%'}}>
                 <ul>
                 {list}
                 </ul>
                <ContextMenu></ContextMenu>
                <Modal option={ modal }   />
            </div>
        )
    }
}

const mapStateToProps =function (state) {
    return {
        selectFolder:state.treeCounter.selectFolder
        ,modal:state.treeCounter.dbFile
    }
}

const mapDispatchToProps = function(dispatch ,ownProps) {
    return {
        saveFile:function(opt){
            dispatch(actions.saveFileContent(opt));
        }
        ,folderClick:function(path,isFile){
            if(isFile==1||isFile=="1"){
                dispatch(actions.dbFile(path));
            }else{
                dispatch({type:"showFolder",path:path});
            }

        }
        ,menuClick:function(opt){
            dispatch({type:'showMenu',display:'block',left:opt.left,top:opt.top,isFile:opt.isFile,path:opt.path});

        }
        ,close:function(){
            dispatch({type:"close"});
        }
    }
}

var fileexplore=connect(
    mapStateToProps,
    mapDispatchToProps
)(fileexplorer);
//export default navcon;
module.exports =fileexplore;