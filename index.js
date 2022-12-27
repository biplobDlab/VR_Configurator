//Sketchafab variables
var version = "1.12.1";
var uid = 'ee51fcd03b804a6eba5228761f063a48'; //object url id
var iframe = document.querySelector('#api-frame');
var configData = {
  success: null,
  error: null,
  preload: 1,
  autospin: 0,
  ui_ar: 0,
  ui_start: 0,
  ui_settings: 0,
  ui_help: 0,
  ui_animations: 0,
  ui_fullscreen: 0,
  ui_watermark: 0,
  ui_inspector: 0,
  ui_infos: 0
}
const wallMatName = "Feature_Wall";
const floorMatName = "Floor_Interior";
var wallMat = null;
var florMat = null;

const walltextureList =
{
  'Wall1':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/dark_brick_wall.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/dark_brick_wall/dark_brick_wall_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/dark_brick_wall/dark_brick_wall_disp_1k.jpg',
    scale: [10, 10],
    uid_b: null,
    uid_n: null,
    uid_r: null
  },
  'Wall2':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/hexagonal_concrete_paving.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/hexagonal_concrete_paving/hexagonal_concrete_paving_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/hexagonal_concrete_paving/hexagonal_concrete_paving_disp_1k.jpg',
    scale: [7, 7],
    uid_b: null,
    uid_n: null,
    uid_r: null
  },
  'Wall3':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/square_concrete_pavers.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/square_concrete_pavers/square_concrete_pavers_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/square_concrete_pavers/square_concrete_pavers_disp_1k.jpg',
    scale: [5, 5],
    uid_b: null,
    uid_n: null,
    uid_r: null
  }

};
const floorTextureList =
{
  'Floor1':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/dark_brick_wall.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/dark_brick_wall/dark_brick_wall_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/dark_brick_wall/dark_brick_wall_disp_1k.jpg',
    scale: [10, 10],
    uid_b: null,
    uid_n: null,
    uid_r: null
  },
  'Floor2':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/hexagonal_concrete_paving.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/hexagonal_concrete_paving/hexagonal_concrete_paving_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/hexagonal_concrete_paving/hexagonal_concrete_paving_disp_1k.jpg',
    scale: [7, 7],
    uid_b: null,
    uid_n: null,
    uid_r: null
  },
  'Floor3':
  {
    url_b: 'https://cdn.polyhaven.com/asset_img/primary/square_concrete_pavers.png',
    url_n: 'https://cdn.polyhaven.com/asset_img/map_previews/square_concrete_pavers/square_concrete_pavers_nor_gl_1k.jpg',
    url_r: 'https://cdn.polyhaven.com/asset_img/map_previews/square_concrete_pavers/square_concrete_pavers_disp_1k.jpg',
    scale: [5, 5],
    uid_b: null,
    uid_n: null,
    uid_r: null
  }
};

var Objects =
{
  "Couch_1":
  {
    object: null
  },
  "Couch_2":
  {
    object: null
  }

}


//all acciabel variables
var s_api = null;
var materialsList = null;
var animationList = null;
var nodesList = null;
var defultTextureList = null;
var client = new window.Sketchfab(version, iframe);

var error = configData.error = function error() {
  console.error('Sketchfab API error');
};
function setUid(list) {
}
configData.success = function success(api) {
  //callback
  api.start(function () {
    s_api = api;
    //callback
    api.addEventListener('viewerready', function () {
      //view ready
      console.log("veiw ready");
      $('.Controls_Buttons').removeClass("d-none");

      //geting all nodes form objfect 
      api.getNodeMap(function (error, nodesList) {
        if (!error) {

          console.log(nodesList);

          for (const name in Objects) {
            for (const node in nodesList) {
              if (Objects[name].object === null && nodesList[node].name === name) 
              {
                Objects[name].object = nodesList[node].instanceID;
                console.log(nodesList[node].instanceID);
              }
            }
          }
          
        }
      });
      //geting all matrials form object
      api.getMaterialList(function (error, allMatrials) {
        if (!error) {
          for (const t in allMatrials) {
            if (allMatrials[t].name == wallMatName) {
              wallMat = allMatrials[t];
              console.log(wallMat);
            }
            else if (allMatrials[t].name == floorMatName) {
              florMat = allMatrials[t];
              console.log(florMat);
            }
          }

          //flor texture
          for (const t in floorTextureList) {
            api.addTexture(floorTextureList[t].url_b, function (err, tuid) {
              if (!error) {
                floorTextureList[t].uid_b = tuid;
                console.log(t, floorTextureList[t].uid_b);
              }
            });
            api.addTexture(floorTextureList[t].url_n, function (err, tuid) {
              if (!error) {
                floorTextureList[t].uid_n = tuid;
                console.log(t, floorTextureList[t].uid_n);
              }
            });
            api.addTexture(floorTextureList[t].url_r, function (err, tuid) {
              if (!error) {
                floorTextureList[t].uid_r = tuid;
                console.log(t, floorTextureList[t].uid_r);
              }
            });
          }

          // wall texture
          for (const t in walltextureList) {
            api.addTexture(walltextureList[t].url_b, function (err, tuid) {
              if (!error) {
                walltextureList[t].uid_b = tuid;
                console.log(t, walltextureList[t].uid_b);
              }
            });
            api.addTexture(walltextureList[t].url_n, function (err, tuid) {
              if (!error) {
                walltextureList[t].uid_n = tuid;
                console.log(t, walltextureList[t].uid_n);
              }
            });
            api.addTexture(walltextureList[t].url_r, function (err, tuid) {
              if (!error) {
                walltextureList[t].uid_r = tuid;
                console.log(t, walltextureList[t].uid_r);
              }
            });
          }
        }

      });

    });
  });

}

client.init(uid, configData);



function wallCheck(button) {
  console.log(wallMat.channels.AlbedoPBR.UVTransforms.scale);
  wallMat.channels.AlbedoPBR.texture.uid = walltextureList[button.id].uid_b;
  wallMat.channels.AlbedoPBR.UVTransforms.scale = walltextureList[button.id].scale;
  console.log(wallMat.channels.AlbedoPBR.UVTransforms.scale);

  wallMat.channels.NormalMap.texture.uid = walltextureList[button.id].uid_n;
  wallMat.channels.NormalMap.UVTransforms.scale = walltextureList[button.id].scale;

  wallMat.channels.RoughnessPBR.texture.uid = walltextureList[button.id].uid_r;
  wallMat.channels.RoughnessPBR.UVTransforms.scale = walltextureList[button.id].scale;
  //wallMat.channels.AlbedoPBR.enable = true;
  s_api.setMaterial(wallMat, () => {
    console.log("Butotn Clicked", wallMat);

  });
}

function FloorCheck(button) {

  console.log(florMat.channels.AlbedoPBR.UVTransforms.scale);
  florMat.channels.AlbedoPBR.texture.uid = floorTextureList[button.id].uid_b;
  florMat.channels.AlbedoPBR.UVTransforms.scale = floorTextureList[button.id].scale;
  console.log(florMat.channels.AlbedoPBR.UVTransforms.scale);

  florMat.channels.NormalMap.texture.uid = floorTextureList[button.id].uid_n;
  florMat.channels.NormalMap.UVTransforms.scale = floorTextureList[button.id].scale;

  florMat.channels.RoughnessPBR.texture.uid = floorTextureList[button.id].uid_r;
  florMat.channels.RoughnessPBR.UVTransforms.scale = floorTextureList[button.id].scale;

  //wallMat.channels.AlbedoPBR.enable = true;
  s_api.setMaterial(florMat, () => { });
}

function ActivateObjects(button) {

  for (const id in Objects) {

    console.log(id, button.id);

    if (id === button.id) 
    {
      s_api.show(Objects[id].object,function()
      {        

      });
    }
    else 
    {
      s_api.hide(Objects[id].object, function()
      {        

      });
    }
  }

}