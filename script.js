(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_854F9FFA_9E33_9166_41E3_43DA79DF97E5]); this.init(); this.syncPlaylists([this.DropDown_84559F89_963B_E219_41D7_4CFD96176A3D_playlist,this.mainPlayList]); this.DropDown_84559F89_963B_E219_41D7_4CFD96176A3D_playlist.set('selectedIndex', 0)",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "width": "100%",
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "mobileMipmappingEnabled": false,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_85C5D00D_963A_5E19_41DA_FDF66C3338D3",
  "this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "layout": "absolute",
 "minWidth": 20,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scripts": {
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "height": "100%",
 "downloadEnabled": true,
 "gap": 10,
 "shadow": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "class": "Player",
 "data": {
  "name": "Player461"
 },
 "overflow": "visible",
 "definitions": [{
 "class": "ImageResource",
 "id": "ImageResource_88F6F031_9EFB_7A15_41D6_91911F124DC1",
 "levels": [
  {
   "url": "media/popup_91DC874D_9EE4_B16E_41AA_21862A6D660A_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_91DC874D_9EE4_B16E_41AA_21862A6D660A_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_91DC874D_9EE4_B16E_41AA_21862A6D660A_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_825027D4_9E32_B1A8_41C0_B60182B03E5E.mp3",
  "oggUrl": "media/audio_825027D4_9E32_B1A8_41C0_B60182B03E5E.ogg"
 },
 "autoplay": true,
 "id": "audio_825027D4_9E32_B1A8_41C0_B60182B03E5E",
 "data": {
  "label": "rumahinfo"
 }
},
{
 "class": "PlayList",
 "items": [
  "this.PanoramaPlayListItem_B733007D_A3EA_E91F_41CC_8B8D156CE9E3",
  "this.PanoramaPlayListItem_B732707E_A3EA_E91D_41DA_88E822BB378C",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D19D659_6747_8E76_41D5_8104CE581847_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_6D19D659_6747_8E76_41D5_8104CE581847",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D0D94F5_6747_823E_41C1_7741FF969972_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_6D0D94F5_6747_823E_41C1_7741FF969972",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 5)",
   "camera": "this.panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 6)",
   "camera": "this.panorama_6D0D744E_6744_826A_41D2_16299F358104_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_6D0D744E_6744_826A_41D2_16299F358104",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 7)",
   "camera": "this.panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_6D1972F6_6744_863A_41D7_E3694AB0211B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 8)",
   "camera": "this.panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 9)",
   "camera": "this.panorama_6D277203_6745_81DA_41D0_1CDEF099231C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_6D277203_6745_81DA_41D0_1CDEF099231C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D183060_6744_8256_41D1_0569564649E4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_6D183060_6744_8256_41D1_0569564649E4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_B6CBB080_A3EA_E9E5_41B5_BFC98B32A4C9",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_6D04D3F0_674C_8636_41D4_3D0671677C46",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_6D28A34F_674C_866A_41C8_D7E7809F533D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_6D04C326_674C_87DA_41C1_ABCAFF334607",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D1663F1_674C_8636_41B0_749278C02603_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_6D1663F1_674C_8636_41B0_749278C02603",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_B6CF1082_A3EA_E9E5_41D7_37659AD5D9EC"
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "autoplay": true,
 "id": "audio_888D45D2_9E24_843B_41BB_2A1889E04925",
 "data": {
  "label": "MELAKA  Kisah Parameswara (The Tales Of Parameswara)"
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_95AC01E2_9A1B_0764_41C9_0AA9379A19E5",
 "levels": [
  {
   "url": "media/popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95AE11E4_9A1B_0763_41B0_DACA0B07EE08",
 "levels": [
  {
   "url": "media/popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B241E0_9A1B_0763_41CC_FD26664849A5",
 "levels": [
  {
   "url": "media/popup_969F121C_99F2_24F3_41D6_B9D6CB11C285_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_969F121C_99F2_24F3_41D6_B9D6CB11C285_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_969F121C_99F2_24F3_41D6_B9D6CB11C285_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_969F121C_99F2_24F3_41D6_B9D6CB11C285_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D277203_6745_81DA_41D0_1CDEF099231C_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95AA01E7_9A1B_076D_41E2_0EC317492DB4",
 "levels": [
  {
   "url": "media/popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.59,
 "id": "popup_89D48890_99F6_65F3_41D0_72655BF2258F",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_89D48890_99F6_65F3_41D0_72655BF2258F_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -32.54,
 "yaw": -51.64,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D1972F6_6744_863A_41D7_E3694AB0211B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "audios": [
  "this.audio_888D45D2_9E24_843B_41BB_2A1889E04925"
 ],
 "id": "panorama_6D0D744E_6744_826A_41D2_16299F358104",
 "thumbnailUrl": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_t.jpg",
 "label": "7",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_88637C67_87DE_7C72_41DE_33BBCC279361",
  "this.overlay_8408E3A2_9E65_BC77_41D2_C510CB56DFBD",
  "this.popup_852F10D6_9E5F_9DDE_41DB_E82E18605676",
  "this.overlay_823101E4_9E5C_9FF2_41DF_5AD6CCDA161E",
  "this.popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_88FFF043_9EFB_7A75_41E3_6737E2518EEA",
 "levels": [
  {
   "url": "media/popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "class": "PanoramaAudio",
 "loop": true,
 "audio": "this.audioresource_84A93ABC_9E35_93E4_41E1_138BFD7CABB1",
 "autoplay": true,
 "id": "audio_890087D6_9E12_91CC_41E3_B92460552BFD",
 "data": {
  "label": "ocean-sea-soft-waves-121349"
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_88F8F03B_9EFB_7A15_41A0_CDA8ED232E43",
 "levels": [
  {
   "url": "media/popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 960,
   "height": 1280
  },
  {
   "url": "media/popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 768,
   "height": 1024
  },
  {
   "url": "media/popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 384,
   "height": 512
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75",
 "thumbnailUrl": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_t.jpg",
 "label": "2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_96E81C16_9DEE_9539_41C4_006688EB7A14",
   "class": "PanoramaMapLocation",
   "angle": -4.09,
   "y": 586.27,
   "x": 200.69
  }
 ],
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_923A3963_87CC_AAF9_41C1_EC2A4130E08E",
  "this.overlay_97662055_87D6_C451_41D8_52741C9774AE"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "10",
 "audios": [
  "this.audio_888D8803_9E27_8C18_41D3_DFD0511CEBEA"
 ],
 "id": "panorama_6D277203_6745_81DA_41D0_1CDEF099231C",
 "thumbnailUrl": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_93AF7B7E_9EEC_EE0F_41D9_E23ADA8AEC45",
  "this.popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB",
  "this.overlay_9082D41F_9EEF_3A0D_41D2_80044427A1E9",
  "this.popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A",
  "this.overlay_9078BB4D_9EED_6E0D_41D6_3CE8602C5591",
  "this.popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_9691391F_88D7_C5D2_41B0_023F25F6A524",
 "levels": [
  {
   "url": "media/popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 4032
  },
  {
   "url": "media/popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0_0_1.png",
   "class": "ImageResourceLevel",
   "width": 1536,
   "height": 2048
  },
  {
   "url": "media/popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0_0_2.png",
   "class": "ImageResourceLevel",
   "width": 768,
   "height": 1024
  },
  {
   "url": "media/popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0_0_3.png",
   "class": "ImageResourceLevel",
   "width": 384,
   "height": 512
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D1663F1_674C_8636_41B0_749278C02603_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B021DD_9A1B_075C_41D9_BAAC28475DA1",
 "levels": [
  {
   "url": "media/popup_89D48890_99F6_65F3_41D0_72655BF2258F_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_89D48890_99F6_65F3_41D0_72655BF2258F_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_89D48890_99F6_65F3_41D0_72655BF2258F_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_89D48890_99F6_65F3_41D0_72655BF2258F_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 23.62,
 "id": "popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 768,
    "height": 1024
   }
  ]
 },
 "pitch": -7.6,
 "yaw": 79.23,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D04C326_674C_87DA_41C1_ABCAFF334607"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "18",
 "id": "panorama_6D28A34F_674C_866A_41C8_D7E7809F533D",
 "thumbnailUrl": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9CBE1D44_88DB_FDB6_41D1_C92438EDFA3B",
  "this.overlay_97EDA9D1_99EE_2775_41D6_FAB1FB950BD9",
  "this.popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_camera"
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "autoplay": true,
 "id": "audio_889ED6DC_9E27_8428_419E_E9FE9C840271",
 "data": {
  "label": "MELAKA  Kisah Parameswara (The Tales Of Parameswara)"
 }
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "autoplay": true,
 "id": "audio_888D8803_9E27_8C18_41D3_DFD0511CEBEA",
 "data": {
  "label": "MELAKA  Kisah Parameswara (The Tales Of Parameswara)"
 }
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 37.43,
 "id": "popup_96CDE57B_99F6_2F36_41CE_020CA60AC974",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_96CDE57B_99F6_2F36_41CE_020CA60AC974_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -18.03,
 "yaw": -48.64,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 4.91,
 "id": "popup_969F121C_99F2_24F3_41D6_B9D6CB11C285",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_969F121C_99F2_24F3_41D6_B9D6CB11C285_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -26.39,
 "yaw": -136.57,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D28A34F_674C_866A_41C8_D7E7809F533D"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "17",
 "id": "panorama_6D04D3F0_674C_8636_41D4_3D0671677C46",
 "thumbnailUrl": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9D48E6DF_88DA_CC52_41DE_FBC4A2868FA9"
 ]
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "layout": "vertical",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window3491"
 },
 "bodyPaddingRight": 5,
 "id": "window_915B76E9_9E2F_8454_41D5_99C1C57AAF26",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "minHeight": 20,
 "bodyPaddingTop": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "width": 400,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "0.68vw",
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 5,
 "veilColorDirection": "horizontal",
 "titleFontWeight": "normal",
 "shadowSpread": 1,
 "shadow": true,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "titlePaddingTop": 5,
 "class": "Window",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 10,
 "paddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_9158A6E9_9E2F_8454_41D1_77D20695D9E8",
  {
   "paddingRight": 0,
   "backgroundColorRatios": [],
   "propagateClick": false,
   "paddingLeft": 0,
   "borderSize": 0,
   "minHeight": 0,
   "url": "//www.youtube.com/embed/42EmemTLIJA?si=Vv6RMVdTF1Gd6rEG",
   "backgroundColorDirection": "vertical",
   "scrollEnabled": true,
   "minWidth": 0,
   "width": "100%",
   "backgroundColor": [],
   "insetBorder": false,
   "height": "50%",
   "shadow": false,
   "paddingTop": 0,
   "paddingBottom": 0,
   "backgroundOpacity": 1,
   "borderRadius": 0,
   "class": "WebFrame",
   "data": {
    "name": "VideoUrl3836"
   }
  }
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titlePaddingRight": 5,
 "footerHeight": 5,
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "titleFontStyle": "normal",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "headerBackgroundOpacity": 1,
 "bodyBorderColor": "#000000",
 "paddingTop": 0,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "close": "this.resumeGlobalAudios('window_915B76E9_9E2F_8454_41D5_99C1C57AAF26')",
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "shadowVerticalLength": 0,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 51.64,
 "id": "popup_86B2F40B_896D_5A30_41DF_8782026705F7",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_86B2F40B_896D_5A30_41DF_8782026705F7_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -3.79,
 "yaw": -99.08,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_88F8D03F_9EFB_7A0D_41B8_2931E6177F98",
 "levels": [
  {
   "url": "media/popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "12",
 "id": "panorama_6D183060_6744_8256_41D1_0569564649E4",
 "thumbnailUrl": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_95BA7E86_87EA_FCB3_41DA_3743723E94E0"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_88F58033_9EFB_7A15_41D1_262C3150B126",
 "levels": [
  {
   "url": "media/popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "autoplay": true,
 "id": "audio_88959B1E_9E27_8C28_41E3_77B09CADA103",
 "data": {
  "label": "MELAKA  Kisah Parameswara (The Tales Of Parameswara)"
 }
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "1st Floor",
 "id": "map_96E81C16_9DEE_9539_41C4_006688EB7A14",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_t.png",
 "width": 775,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14.png",
    "class": "ImageResourceLevel",
    "width": 775,
    "height": 1370
   },
   {
    "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_lq.png",
    "class": "ImageResourceLevel",
    "width": 192,
    "height": 340,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.08,
 "fieldOfViewOverlayOutsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#33FF66",
 "height": 1370,
 "overlays": [
  "this.overlay_9004F2B5_9DEE_8D57_41E1_44C78A6ED43C",
  "this.overlay_8DD66156_9DED_8FDF_41CE_C6389BD1ACFE",
  "this.overlay_8DA5F2E1_9DF2_B2FA_4193_E6A37D7D54A5"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D068096_674F_82FA_41C7_983F47D83DFE_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD",
 "thumbnailUrl": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_t.jpg",
 "label": "15",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_967E6427_9DEE_9567_41DD_9079CBA60178",
   "class": "PanoramaMapLocation",
   "angle": 178.57,
   "y": 374.73,
   "x": 278.6
  }
 ],
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_932842F2_87EA_C452_41D0_BFEC747143B7"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0D94F5_6747_823E_41C1_7741FF969972_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 80.61,
 "id": "popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": 11.01,
 "yaw": -7.1,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_95AF81E5_9A1B_076D_41DB_5C0704EAE726",
 "levels": [
  {
   "url": "media/popup_9410C2B1_99EE_A743_41BD_CA43C71D786B_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 4032
  },
  {
   "url": "media/popup_9410C2B1_99EE_A743_41BD_CA43C71D786B_0_1.png",
   "class": "ImageResourceLevel",
   "width": 1536,
   "height": 2048
  },
  {
   "url": "media/popup_9410C2B1_99EE_A743_41BD_CA43C71D786B_0_2.png",
   "class": "ImageResourceLevel",
   "width": 768,
   "height": 1024
  },
  {
   "url": "media/popup_9410C2B1_99EE_A743_41BD_CA43C71D786B_0_3.png",
   "class": "ImageResourceLevel",
   "width": 384,
   "height": 512
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_camera"
},
{
 "label": "25",
 "audios": [
  "this.audio_890087D6_9E12_91CC_41E3_B92460552BFD"
 ],
 "id": "panorama_6D068096_674F_82FA_41C7_983F47D83DFE",
 "thumbnailUrl": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_96E81C16_9DEE_9539_41C4_006688EB7A14",
   "class": "PanoramaMapLocation",
   "angle": 181.47,
   "y": 1066.74,
   "x": 151.3
  }
 ],
 "overlays": [
  "this.overlay_853635F7_97D0_76D2_41D0_1520CFC35E1F"
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 49.88,
 "id": "popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 2.69,
 "yaw": -82.71,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 4.19,
 "id": "popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0_0_2.png",
    "class": "ImageResourceLevel",
    "width": 768,
    "height": 1024
   }
  ]
 },
 "pitch": -14.25,
 "yaw": -39.59,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_9AD5D79B_8963_C650_41D5_24F502F08FB4",
 "levels": [
  {
   "url": "media/popup_86B2F40B_896D_5A30_41DF_8782026705F7_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_86B2F40B_896D_5A30_41DF_8782026705F7_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_86B2F40B_896D_5A30_41DF_8782026705F7_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_86B2F40B_896D_5A30_41DF_8782026705F7_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843"
  }
 ],
 "hfov": 360,
 "label": "1",
 "audios": [
  "this.audio_8CB1315A_9A1D_04A4_41C2_5543690C2860"
 ],
 "id": "panorama_6C286C8F_6745_82EA_41D4_E816F04A581A",
 "thumbnailUrl": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_96E81C16_9DEE_9539_41C4_006688EB7A14",
   "class": "PanoramaMapLocation",
   "angle": 270,
   "y": 659.16,
   "x": 145.41
  }
 ],
 "overlays": [
  "this.overlay_69C9B34E_674D_7A40_41BE_8AE545CC29D5",
  "this.overlay_6A5418A5_6757_9C37_41D0_8C788379BBB0",
  "this.overlay_9B04044F_890A_E350_41DF_1B7A446D8204",
  "this.overlay_8631F4B1_896E_DA50_41C3_4A2D3C0D96A8",
  "this.popup_86B2F40B_896D_5A30_41DF_8782026705F7",
  "this.overlay_88643D0B_9A1E_3CD5_41D4_A81BB934B56E",
  "this.popup_88956366_9A1E_2B5F_41D7_61F6E4840972"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D068096_674F_82FA_41C7_983F47D83DFE"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "24",
 "id": "panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843",
 "thumbnailUrl": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_99316AEF_8906_E750_41DA_220994786765"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D19D659_6747_8E76_41D5_8104CE581847_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 43.56,
 "id": "popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 1.79,
 "yaw": 74.22,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 39.94,
 "id": "popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 1.33,
 "yaw": 65.44,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D183060_6744_8256_41D1_0569564649E4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 4.57,
 "id": "popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -34.1,
 "yaw": -78.06,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D04D3F0_674C_8636_41D4_3D0671677C46"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "16",
 "id": "panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81",
 "thumbnailUrl": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9384B5A5_87EA_4CF6_41BE_A21D607C0098",
  "this.overlay_9CC8BE48_88D6_3FBE_41C9_4D23C482EE96",
  "this.overlay_9CA73532_88D6_4DD2_41DF_AE26956DA2B4",
  "this.overlay_9C9A43F3_88D6_4452_4190_22F6BA46BADB",
  "this.overlay_9699D9B3_99F6_E735_41DD_A19A935E944E",
  "this.popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD",
  "this.overlay_89C1227C_99F6_2533_41E2_8DBD77484352",
  "this.popup_96CDE57B_99F6_2F36_41CE_020CA60AC974",
  "this.overlay_97460789_99F2_2BD5_41E0_DFAAEDA88E1B",
  "this.popup_89D48890_99F6_65F3_41D0_72655BF2258F",
  "this.popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699",
  "this.popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F",
  "this.popup_969F121C_99F2_24F3_41D6_B9D6CB11C285"
 ]
},
{
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B331E1_9A1B_0765_41C2_415C1BEEEADB",
 "levels": [
  {
   "url": "media/popup_96CDE57B_99F6_2F36_41CE_020CA60AC974_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_96CDE57B_99F6_2F36_41CE_020CA60AC974_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_96CDE57B_99F6_2F36_41CE_020CA60AC974_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_96CDE57B_99F6_2F36_41CE_020CA60AC974_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "19",
 "id": "panorama_6D04C326_674C_87DA_41C1_ABCAFF334607",
 "thumbnailUrl": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9D7AFDF4_88DA_FC56_41D4_F9A65240ADA1"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D1663F1_674C_8636_41B0_749278C02603"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "21",
 "id": "panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A",
 "thumbnailUrl": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9DE1F7CF_88DE_4CB2_41CC_4F7ABBEE64A5"
 ]
},
{
 "class": "PanoramaAudio",
 "audio": "this.audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "autoplay": true,
 "id": "audio_8BDD79AE_9E24_8C6B_41D6_626BF00E2E10",
 "data": {
  "label": "MELAKA  Kisah Parameswara (The Tales Of Parameswara)"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_camera"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "2nd Floor",
 "id": "map_967E6427_9DEE_9567_41DD_9079CBA60178",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_967E6427_9DEE_9567_41DD_9079CBA60178_t.png",
 "width": 672,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_967E6427_9DEE_9567_41DD_9079CBA60178.png",
    "class": "ImageResourceLevel",
    "width": 672,
    "height": 1322
   },
   {
    "url": "media/map_967E6427_9DEE_9567_41DD_9079CBA60178_lq.png",
    "class": "ImageResourceLevel",
    "width": 182,
    "height": 359,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.08,
 "fieldOfViewOverlayOutsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#33FF60",
 "height": 1322,
 "overlays": [
  "this.overlay_90AF37DA_9DEF_B326_41DF_EA36BBEB3447"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D19D659_6747_8E76_41D5_8104CE581847"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "3",
 "id": "panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B",
 "thumbnailUrl": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_92AD170C_87CC_A64F_41D4_E99E30DA3AE4"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_96E81C16_9DEE_9539_41C4_006688EB7A14",
   "player": "this.MapViewerMapPlayer"
  },
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_967E6427_9DEE_9567_41DD_9079CBA60178",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "DropDown_84559F89_963B_E219_41D7_4CFD96176A3D_playlist"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0D94F5_6747_823E_41C1_7741FF969972"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "4",
 "id": "panorama_6D19D659_6747_8E76_41D5_8104CE581847",
 "thumbnailUrl": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_8A28EA14_87D6_C7D6_41DF_D03DABAB489F"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "20",
 "id": "panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217",
 "thumbnailUrl": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_9D12B8D2_88DD_C453_418D_B308FCF6167C",
  "this.overlay_89E85866_99ED_63C0_41B0_3729F5EB5E2A",
  "this.popup_9410C2B1_99EE_A743_41BD_CA43C71D786B"
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 79.05,
 "id": "popup_88956366_9A1E_2B5F_41D7_61F6E4840972",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_88956366_9A1E_2B5F_41D7_61F6E4840972_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": 6.8,
 "yaw": 79.22,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 47.17,
 "id": "popup_852F10D6_9E5F_9DDE_41DB_E82E18605676",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_852F10D6_9E5F_9DDE_41DB_E82E18605676_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 2.39,
 "yaw": -96.79,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "14",
 "id": "panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3",
 "thumbnailUrl": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_95B037C3_87EE_4CB2_4177_85EDDA9E628E"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D183060_6744_8256_41D1_0569564649E4"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "11",
 "id": "panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD",
 "thumbnailUrl": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_91D32D9F_87D6_FCD2_418B_1CF751A52EC2"
 ]
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_8970D1BA_9E1D_8E42_41D8_DCA56C22C313.mp3",
  "oggUrl": "media/audio_8970D1BA_9E1D_8E42_41D8_DCA56C22C313.ogg"
 },
 "autoplay": true,
 "id": "audio_8970D1BA_9E1D_8E42_41D8_DCA56C22C313",
 "data": {
  "label": "ocean-sea-soft-waves-121349"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0D744E_6744_826A_41D2_16299F358104_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE"
  }
 ],
 "hfov": 360,
 "partial": false,
 "audios": [
  "this.audio_889ED6DC_9E27_8428_419E_E9FE9C840271"
 ],
 "id": "panorama_6D1972F6_6744_863A_41D7_E3694AB0211B",
 "thumbnailUrl": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_t.jpg",
 "label": "8",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_88327DF0_87DA_7C6E_41DF_EF79833FBFD3",
  "this.overlay_904B8A20_9EEB_52D6_41C4_1C3F4EBE1C67",
  "this.popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534",
  "this.overlay_914BAFF7_9EED_513A_41CA_CB0FF88A910C",
  "this.popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "22",
 "id": "panorama_6D1663F1_674C_8636_41B0_749278C02603",
 "thumbnailUrl": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_9E9FD395_88DF_C4D6_41DF_B2B9AB30B272",
  "this.popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0",
  "this.overlay_890B7170_9A11_E733_41E1_9D14DCA65E0D",
  "this.popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "5",
 "id": "panorama_6D0D94F5_6747_823E_41C1_7741FF969972",
 "thumbnailUrl": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_88487856_87DE_4452_41BE_92C56AB523C7"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_camera"
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.55,
 "id": "popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -25.74,
 "yaw": -26.14,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 40.44,
 "id": "popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": -23.79,
 "yaw": -108.26,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 38.98,
 "id": "popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 3.14,
 "yaw": -56.38,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D277203_6745_81DA_41D0_1CDEF099231C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "audios": [
  "this.audio_88959B1E_9E27_8C28_41E3_77B09CADA103"
 ],
 "id": "panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE",
 "thumbnailUrl": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_t.jpg",
 "label": "9",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_97B279F4_87DB_C456_41D9_B54C550BC6BC"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_88F47035_9EFB_7A1D_41E0_93EFC813F728",
 "levels": [
  {
   "url": "media/popup_852F10D6_9E5F_9DDE_41DB_E82E18605676_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_852F10D6_9E5F_9DDE_41DB_E82E18605676_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_852F10D6_9E5F_9DDE_41DB_E82E18605676_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 24.79,
 "id": "popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 2.54,
 "yaw": -2.05,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_camera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B101DE_9A1B_075C_41C8_6BAF1845D91B",
 "levels": [
  {
   "url": "media/popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 43.56,
 "id": "popup_91DC874D_9EE4_B16E_41AA_21862A6D660A",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_91DC874D_9EE4_B16E_41AA_21862A6D660A_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 1.79,
 "yaw": -69.84,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_88FB6037_9EFB_7A1D_41D3_D14332DDD4F5",
 "levels": [
  {
   "url": "media/popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "13",
 "id": "panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA",
 "thumbnailUrl": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_93F37B18_87EE_45DF_41A5_88311C6E2BDC"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B1C1E1_9A1B_0765_41DA_539BB6A88964",
 "levels": [
  {
   "url": "media/popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_95B451DB_9A1B_07A4_41D7_2E545F41C5A5",
 "levels": [
  {
   "url": "media/popup_88956366_9A1E_2B5F_41D7_61F6E4840972_0_0.png",
   "class": "ImageResourceLevel",
   "width": 3024,
   "height": 3024
  },
  {
   "url": "media/popup_88956366_9A1E_2B5F_41D7_61F6E4840972_0_1.png",
   "class": "ImageResourceLevel",
   "width": 2048,
   "height": 2048
  },
  {
   "url": "media/popup_88956366_9A1E_2B5F_41D7_61F6E4840972_0_2.png",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 1024
  },
  {
   "url": "media/popup_88956366_9A1E_2B5F_41D7_61F6E4840972_0_3.png",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 77.85,
 "id": "popup_9410C2B1_99EE_A743_41BD_CA43C71D786B",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_9410C2B1_99EE_A743_41BD_CA43C71D786B_0_2.png",
    "class": "ImageResourceLevel",
    "width": 768,
    "height": 1024
   }
  ]
 },
 "pitch": 4.36,
 "yaw": -78.02,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6D0D744E_6744_826A_41D2_16299F358104"
  }
 ],
 "hfov": 360,
 "partial": false,
 "audios": [
  "this.audio_8BDD79AE_9E24_8C6B_41D6_626BF00E2E10"
 ],
 "id": "panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40",
 "thumbnailUrl": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_t.jpg",
 "label": "6",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 8,
      "tags": "ondemand",
      "colCount": 8,
      "width": 4096,
      "height": 4096
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8845AADF_87DF_C452_41D0_761ADFE4A62F",
  "this.overlay_93949019_9EE7_4EF7_41C1_F39B7F475C97",
  "this.popup_91DC874D_9EE4_B16E_41AA_21862A6D660A",
  "this.overlay_90340608_9EE5_52D6_41DA_AD193332322B",
  "this.popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_88F9D038_9EFB_7A13_41BD_DEB6352708F2",
 "levels": [
  {
   "url": "media/popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 46.85,
 "id": "popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56_0_1.jpg",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 768
   }
  ]
 },
 "pitch": 2.39,
 "yaw": 99.81,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "rotationY": 0,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 119.55,
 "id": "popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28_0_2.png",
    "class": "ImageResourceLevel",
    "width": 1024,
    "height": 1024
   }
  ]
 },
 "pitch": 5.71,
 "yaw": -80.89,
 "hideDuration": 500,
 "popupDistance": 100
},
{
 "class": "ImageResource",
 "id": "ImageResource_88FE9044_9EFB_7A73_41DC_BC127D8CDE11",
 "levels": [
  {
   "url": "media/popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157_0_0.jpg",
   "class": "ImageResourceLevel",
   "width": 1280,
   "height": 960
  },
  {
   "url": "media/popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157_0_1.jpg",
   "class": "ImageResourceLevel",
   "width": 1024,
   "height": 768
  },
  {
   "url": "media/popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157_0_2.jpg",
   "class": "ImageResourceLevel",
   "width": 512,
   "height": 384
  }
 ]
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_854F9FFA_9E33_9166_41E3_43DA79DF97E5.mp3",
  "oggUrl": "media/audio_854F9FFA_9E33_9166_41E3_43DA79DF97E5.ogg"
 },
 "autoplay": true,
 "id": "audio_854F9FFA_9E33_9166_41E3_43DA79DF97E5",
 "data": {
  "label": "The History of the Malacca Sultanate"
 }
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "minHeight": 50,
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 100,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "height": "100%",
 "toolTipShadowColor": "#333333",
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_85C5D00D_963A_5E19_41DA_FDF66C3338D3",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "right": "1.84%",
 "children": [
  "this.MapViewer",
  "this.DropDown_84559F89_963B_E219_41D7_4CFD96176A3D"
 ],
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "3.52%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "48.849%",
 "width": "20.236%",
 "gap": 10,
 "shadow": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "FloorPlan"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_8521810D_97D0_8F36_41B3_F3333DF9F808",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "children": [
  "this.Container_856676AF_97D0_7572_41E1_C3387072A9FB"
 ],
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#FFFFFF"
 ],
 "click": "if(!this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808.get('visible')){ this.setComponentVisibility(this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808, false, 0, null, null, false) }; if(!this.Container_856676AF_97D0_7572_41E1_C3387072A9FB.get('visible')){ this.setComponentVisibility(this.Container_856676AF_97D0_7572_41E1_C3387072A9FB, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_856676AF_97D0_7572_41E1_C3387072A9FB, false, 0, null, null, false) }; if(!this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E.get('visible')){ this.setComponentVisibility(this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E, true, 0, null, null, false) } else { this.setComponentVisibility(this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E, false, 0, null, null, false) }; if(!this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E.get('visible')){ this.setComponentVisibility(this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E, true, 0, null, null, false) } else { this.setComponentVisibility(this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E, false, 0, null, null, false) }",
 "height": "100%",
 "width": "100%",
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "visible": false,
 "class": "Container",
 "data": {
  "name": "3D_Popup"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 0,
 "right": 0,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "minWidth": 0,
 "top": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "class": "UIComponent",
 "data": {
  "name": "UIComponent5199"
 }
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 0,
 "right": 0,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "minWidth": 0,
 "top": 0,
 "bottom": 0,
 "backgroundColor": [],
 "shadow": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "class": "ZoomImage",
 "data": {
  "name": "ZoomImage5200"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "paddingRight": 5,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton5201"
 },
 "id": "closeButtonPopupPanorama",
 "layout": "horizontal",
 "propagateClick": false,
 "paddingLeft": 5,
 "horizontalAlign": "center",
 "fontFamily": "Arial",
 "minHeight": 0,
 "right": 10,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverIconColor": "#666666",
 "iconHeight": 20,
 "backgroundColorDirection": "vertical",
 "minWidth": 0,
 "iconColor": "#000000",
 "verticalAlign": "middle",
 "top": 10,
 "borderColor": "#000000",
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 350
 },
 "iconLineWidth": 5,
 "mode": "push",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "fontSize": "1.29vmin",
 "label": "",
 "shadowBlurRadius": 6,
 "gap": 5,
 "shadow": false,
 "pressedIconColor": "#888888",
 "paddingTop": 5,
 "fontStyle": "normal",
 "paddingBottom": 5,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "class": "CloseButton",
 "iconBeforeLabel": true,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_B733007D_A3EA_E91F_41CC_8B8D156CE9E3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_6C286C8F_6745_82EA_41D4_E816F04A581A",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_B733007D_A3EA_E91F_41CC_8B8D156CE9E3"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_B732707E_A3EA_E91D_41DA_88E822BB378C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_B732707E_A3EA_E91D_41DA_88E822BB378C"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_B6CBB080_A3EA_E9E5_41B5_BFC98B32A4C9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "media": "this.panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_B6CBB080_A3EA_E9E5_41B5_BFC98B32A4C9"
},
{
 "class": "PanoramaPlayListItem",
 "end": "this.trigger('tourEnded')",
 "camera": "this.panorama_6D068096_674F_82FA_41C7_983F47D83DFE_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_B6CF1082_A3EA_E9E5_41D7_37659AD5D9EC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 0)",
 "media": "this.panorama_6D068096_674F_82FA_41C7_983F47D83DFE",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_B6CF1082_A3EA_E9E5_41D7_37659AD5D9EC",
 "start": "this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 23)"
},
{
 "class": "AudioResource",
 "mp3Url": "media/audio_8BDD79AE_9E24_8C6B_41D6_626BF00E2E10.mp3",
 "id": "audioresource_888D35D2_9E24_843B_41AF_A8FDA3892A64",
 "oggUrl": "media/audio_8BDD79AE_9E24_8C6B_41D6_626BF00E2E10.ogg"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.87,
   "image": "this.AnimatedImageResource_83FC5962_9E33_FE8E_41C7_C0A4F58AB4DC",
   "pitch": -29.98,
   "yaw": -1.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_88637C67_87DE_7C72_41DE_33BBCC279361",
 "maps": [
  {
   "hfov": 18.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_852F10D6_9E5F_9DDE_41DB_E82E18605676, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F47035_9EFB_7A1D_41E0_93EFC813F728, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 48.2,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 1704,
      "height": 1450
     }
    ]
   },
   "pitch": 2.39,
   "yaw": -96.79
  }
 ],
 "id": "overlay_8408E3A2_9E65_BC77_41D2_C510CB56DFBD",
 "maps": [
  {
   "hfov": 48.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 170
     }
    ]
   },
   "pitch": 2.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_8593FDDD_9E5D_87D2_41DD_6CB51FD0EA56, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88FB6037_9EFB_7A1D_41D3_D14332DDD4F5, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 47.82,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 1688,
      "height": 1372
     }
    ]
   },
   "pitch": 2.39,
   "yaw": 99.81
  }
 ],
 "id": "overlay_823101E4_9E5C_9FF2_41DF_5AD6CCDA161E",
 "maps": [
  {
   "hfov": 47.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 99.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 162
     }
    ]
   },
   "pitch": 2.39
  }
 ]
},
{
 "class": "AudioResource",
 "mp3Url": "media/audio_890087D6_9E12_91CC_41E3_B92460552BFD.mp3",
 "id": "audioresource_84A93ABC_9E35_93E4_41E1_138BFD7CABB1",
 "oggUrl": "media/audio_890087D6_9E12_91CC_41E3_B92460552BFD.ogg"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.02,
   "image": "this.AnimatedImageResource_83FA4960_9E33_FE8A_41CE_199E50FFF4BD",
   "pitch": -14.38,
   "yaw": -11.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_923A3963_87CC_AAF9_41C1_EC2A4130E08E",
 "maps": [
  {
   "hfov": 16.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -14.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10,
   "image": "this.AnimatedImageResource_83FBF961_9E33_FE8A_41E0_65EAC59EC722",
   "pitch": -22.18,
   "yaw": -26.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_97662055_87D6_C451_41D8_52741C9774AE",
 "maps": [
  {
   "hfov": 10,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9000DD4B_9EEF_6A75_41B0_723AA2E360EB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F8D03F_9EFB_7A0D_41B8_2931E6177F98, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 50.79,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 1808,
      "height": 1648
     }
    ]
   },
   "pitch": 2.69,
   "yaw": -82.71
  }
 ],
 "id": "overlay_93AF7B7E_9EEC_EE0F_41D9_E23ADA8AEC45",
 "maps": [
  {
   "hfov": 50.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 182
     }
    ]
   },
   "pitch": 2.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_910979AE_9EED_2A0F_41E0_DEF0BF4E288A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88FFF043_9EFB_7A75_41E3_6737E2518EEA, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 43.58,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 1522,
      "height": 1333
     }
    ]
   },
   "pitch": 1.79,
   "yaw": 74.22
  }
 ],
 "id": "overlay_9082D41F_9EEF_3A0D_41D2_80044427A1E9",
 "maps": [
  {
   "hfov": 43.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 175
     }
    ]
   },
   "pitch": 1.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_8EC7DE9C_9EEB_2613_41D0_29EF06C66157, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88FE9044_9EFB_7A73_41DC_BC127D8CDE11, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 25.4,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 858,
      "height": 896
     }
    ]
   },
   "pitch": 2.54,
   "yaw": -2.05
  }
 ],
 "id": "overlay_9078BB4D_9EED_6E0D_41D6_3CE8602C5591",
 "maps": [
  {
   "hfov": 25.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D277203_6745_81DA_41D0_1CDEF099231C_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 191,
      "height": 200
     }
    ]
   },
   "pitch": 2.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.28,
   "image": "this.AnimatedImageResource_83E06968_9E33_FE9A_419D_970366755738",
   "pitch": -38.61,
   "yaw": 10.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9CBE1D44_88DB_FDB6_41D1_C92438EDFA3B",
 "maps": [
  {
   "hfov": 21.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 10.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -38.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_944BC922_99EE_24D7_41DB_92DEB7E5CA28, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95AE11E4_9A1B_0763_41B0_DACA0B07EE08, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 125.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 2048,
      "height": 1397
     }
    ]
   },
   "pitch": 5.71,
   "yaw": -80.89
  }
 ],
 "id": "overlay_97EDA9D1_99EE_2775_41D6_FAB1FB950BD9",
 "maps": [
  {
   "hfov": 125.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 136
     }
    ]
   },
   "pitch": 5.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.96,
   "image": "this.AnimatedImageResource_83E0D968_9E33_FE9A_41D7_A981445578D0",
   "pitch": -33.46,
   "yaw": 3.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9D48E6DF_88DA_CC52_41DE_FBC4A2868FA9",
 "maps": [
  {
   "hfov": 19.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -33.46
  }
 ]
},
{
 "paddingRight": 10,
 "propagateClick": false,
 "id": "htmlText_9158A6E9_9E2F_8454_41D1_77D20695D9E8",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "height": "49%",
 "width": "100%",
 "shadow": false,
 "paddingTop": 10,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "class": "HTMLText",
 "data": {
  "name": "HTMLText3492"
 },
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><B><I>Asal-Usul Nama Melaka</I></B> Menurut Legenda ParameswaraSetelah melarikan diri dari Temasik akibat pembunuhan Temagi, Parameswara dan pengikutnya berhenti rehat di tebing Sungai Bertam. Ketika bersandar di bawah sepohon pokok yang rimbun, seekor pelanduk putih muncul dan dikejar oleh anjing pemburu baginda.Ajaibnya, pelanduk itu berbalik menendang anjing tersebut hingga terjatuh ke sungai. Terpegun dengan keberanian haiwan kecil itu, Parameswara mengambil keputusan untuk membuka negeri baharu di situ. Baginda menamakannya Melaka, sempena nama pokok tempat kejadian bersejarah itu berlaku.</SPAN></DIV></div>"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.92,
   "image": "this.AnimatedImageResource_83FEE964_9E33_FE8A_41DF_2E08AFFE4988",
   "pitch": -39.84,
   "yaw": -8.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95BA7E86_87EA_FCB3_41DA_3743723E94E0",
 "maps": [
  {
   "hfov": 27.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -39.84
  }
 ]
},
{
 "map": {
  "width": 37.96,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_0_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 18
    }
   ]
  },
  "y": 637.77,
  "x": 126.42,
  "offsetY": 0,
  "height": 42.77,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 42.77,
  "y": 637.77,
  "width": 37.96,
  "x": 126.42,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_0.png",
     "class": "ImageResourceLevel",
     "width": 37,
     "height": 42
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_9004F2B5_9DEE_8D57_41E1_44C78A6ED43C",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 76.42,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_1_map.gif",
     "class": "ImageResourceLevel",
     "width": 35,
     "height": 16
    }
   ]
  },
  "y": 568.91,
  "x": 162.48,
  "offsetY": 0,
  "height": 34.72,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 34.72,
  "y": 568.91,
  "width": 76.42,
  "x": 162.48,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_1.png",
     "class": "ImageResourceLevel",
     "width": 76,
     "height": 34
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_8DD66156_9DED_8FDF_41CE_C6389BD1ACFE",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 43.26,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_2_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 19
    }
   ]
  },
  "y": 1040.24,
  "x": 129.67,
  "offsetY": 0,
  "height": 53,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 53,
  "y": 1040.24,
  "width": 43.26,
  "x": 129.67,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_96E81C16_9DEE_9539_41C4_006688EB7A14_HS_2.png",
     "class": "ImageResourceLevel",
     "width": 43,
     "height": 52
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "id": "overlay_8DA5F2E1_9DF2_B2FA_4193_E6A37D7D54A5",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.1,
   "image": "this.AnimatedImageResource_83FFE965_9E33_FE8A_41DF_626C5C727FD3",
   "pitch": -39.21,
   "yaw": -23.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_932842F2_87EA_C452_41D0_BFEC747143B7",
 "maps": [
  {
   "hfov": 21.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -39.21
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808, true, 0, null, null, false); this.setComponentVisibility(this.Container_856676AF_97D0_7572_41E1_C3387072A9FB, true, 0, null, null, false); this.setComponentVisibility(this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E, true, 0, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 79.12,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 2048,
      "height": 1316
     }
    ]
   },
   "pitch": -0.77,
   "yaw": -86.01
  }
 ],
 "id": "overlay_853635F7_97D0_76D2_41D0_1520CFC35E1F",
 "maps": [
  {
   "hfov": 79.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D068096_674F_82FA_41C7_983F47D83DFE_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 128
     }
    ]
   },
   "pitch": -0.77
  }
 ]
},
{
 "class": "PanoramaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_8CB1315A_9A1D_04A4_41C2_5543690C2860.mp3",
  "oggUrl": "media/audio_8CB1315A_9A1D_04A4_41C2_5543690C2860.ogg"
 },
 "autoplay": true,
 "id": "audio_8CB1315A_9A1D_04A4_41C2_5543690C2860",
 "data": {
  "label": "Muzik Instrumental Asli - Selamat Datang"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.1,
   "image": "this.AnimatedImageResource_83F9B95A_9E33_FEBF_41D1_152C1195B20B",
   "pitch": -24.24,
   "yaw": 134.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_69C9B34E_674D_7A40_41BE_8AE545CC29D5",
 "maps": [
  {
   "hfov": 17.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -24.24
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_915B76E9_9E2F_8454_41D5_99C1C57AAF26, null, true); this.pauseGlobalAudios('window_915B76E9_9E2F_8454_41D5_99C1C57AAF26')"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.52,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 118,
      "height": 118
     }
    ]
   },
   "pitch": -10.44,
   "yaw": 50.03
  }
 ],
 "id": "overlay_6A5418A5_6757_9C37_41D0_8C788379BBB0",
 "maps": [
  {
   "hfov": 3.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 50.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -10.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.45,
   "image": "this.AnimatedImageResource_83FAB95F_9E33_FEB6_41E3_090B52C60BD9",
   "pitch": -25.6,
   "yaw": -43.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_9B04044F_890A_E350_41DF_1B7A446D8204",
 "maps": [
  {
   "hfov": 18.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_86B2F40B_896D_5A30_41DF_8782026705F7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9AD5D79B_8963_C650_41D5_24F502F08FB4, null, null, null, this.audio_825027D4_9E32_B1A8_41C0_B60182B03E5E, true)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 52.66,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 1885,
      "height": 996
     }
    ]
   },
   "pitch": -3.79,
   "yaw": -99.08
  }
 ],
 "id": "overlay_8631F4B1_896E_DA50_41C3_4A2D3C0D96A8",
 "maps": [
  {
   "hfov": 52.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -99.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 105
     }
    ]
   },
   "pitch": -3.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_88956366_9A1E_2B5F_41D7_61F6E4840972, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B451DB_9A1B_07A4_41D7_2E545F41C5A5, null, null, null, null, true)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 82.44,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 2048,
      "height": 1192
     }
    ]
   },
   "pitch": 6.8,
   "yaw": 79.22
  }
 ],
 "id": "overlay_88643D0B_9A1E_3CD5_41D4_A81BB934B56E",
 "maps": [
  {
   "hfov": 82.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_0_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 116
     }
    ]
   },
   "pitch": 6.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23); var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 22, this.audio_8970D1BA_9E1D_8E42_41D8_DCA56C22C313); var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.95,
   "image": "this.AnimatedImageResource_83E3296B_9E33_FE9E_41B1_CF7033F88A14",
   "pitch": -32.57,
   "yaw": 4.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_99316AEF_8906_E750_41DA_220994786765",
 "maps": [
  {
   "hfov": 22.95,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -32.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.21,
   "image": "this.AnimatedImageResource_83FF7965_9E33_FE8A_41C1_DCEC3096DCB9",
   "pitch": -33.47,
   "yaw": 2.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9384B5A5_87EA_4CF6_41BE_A21D607C0098",
 "maps": [
  {
   "hfov": 21.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -33.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_89D48890_99F6_65F3_41D0_72655BF2258F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B021DD_9A1B_075C_41D9_BAAC28475DA1, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 220,
      "height": 142
     }
    ]
   },
   "pitch": -32.54,
   "yaw": -51.64
  }
 ],
 "id": "overlay_9CC8BE48_88D6_3FBE_41C9_4D23C482EE96",
 "maps": [
  {
   "hfov": 5.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -51.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -32.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_89A044EC_99F2_ED53_41A1_2E18F7F1453F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B101DE_9A1B_075C_41C8_6BAF1845D91B, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.57,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 183,
      "height": 150
     }
    ]
   },
   "pitch": -34.1,
   "yaw": -78.06
  }
 ],
 "id": "overlay_9CA73532_88D6_4DD2_41DF_AE26956DA2B4",
 "maps": [
  {
   "hfov": 4.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -34.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_969F121C_99F2_24F3_41D6_B9D6CB11C285, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B241E0_9A1B_0763_41CC_FD26664849A5, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.91,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 182,
      "height": 164
     }
    ]
   },
   "pitch": -26.39,
   "yaw": -136.57
  }
 ],
 "id": "overlay_9C9A43F3_88D6_4452_4190_22F6BA46BADB",
 "maps": [
  {
   "hfov": 4.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -26.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_973EAD23_99F6_3CD5_41CB_D1F152A13FCD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B1C1E1_9A1B_0765_41DA_539BB6A88964, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 44.5,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 1558,
      "height": 1375
     }
    ]
   },
   "pitch": -23.79,
   "yaw": -108.26
  }
 ],
 "id": "overlay_9699D9B3_99F6_E735_41DD_A19A935E944E",
 "maps": [
  {
   "hfov": 44.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 176
     }
    ]
   },
   "pitch": -23.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_96CDE57B_99F6_2F36_41CE_020CA60AC974, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95B331E1_9A1B_0765_41C2_415C1BEEEADB, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 38.54,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_7_0.png",
      "class": "ImageResourceLevel",
      "width": 1332,
      "height": 967
     }
    ]
   },
   "pitch": -18.03,
   "yaw": -48.64
  }
 ],
 "id": "overlay_89C1227C_99F6_2533_41E2_8DBD77484352",
 "maps": [
  {
   "hfov": 38.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -48.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_7_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 145
     }
    ]
   },
   "pitch": -18.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_89F4AFB4_99F6_1B33_41E0_5E4CB955B699, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95AC01E2_9A1B_0764_41C9_0AA9379A19E5, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 10.76,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_8_0.png",
      "class": "ImageResourceLevel",
      "width": 358,
      "height": 842
     }
    ]
   },
   "pitch": -25.74,
   "yaw": -26.14
  }
 ],
 "id": "overlay_97460789_99F2_2BD5_41E0_DFAAEDA88E1B",
 "maps": [
  {
   "hfov": 10.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_0_HS_8_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 85,
      "height": 200
     }
    ]
   },
   "pitch": -25.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.49,
   "image": "this.AnimatedImageResource_83E13969_9E33_FE9A_41B4_3EA9658D21FC",
   "pitch": -40.23,
   "yaw": 3.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9D7AFDF4_88DA_FC56_41D4_F9A65240ADA1",
 "maps": [
  {
   "hfov": 18.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -40.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.59,
   "image": "this.AnimatedImageResource_83E2196A_9E33_FE9E_41CB_F722D4E1BF75",
   "pitch": -40.88,
   "yaw": 4.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9DE1F7CF_88DE_4CB2_41CC_4F7ABBEE64A5",
 "maps": [
  {
   "hfov": 20.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -40.88
  }
 ]
},
{
 "map": {
  "width": 65.97,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_967E6427_9DEE_9567_41DD_9079CBA60178_HS_0_map.gif",
     "class": "ImageResourceLevel",
     "width": 23,
     "height": 16
    }
   ]
  },
  "y": 351.84,
  "x": 245.61,
  "offsetY": 0,
  "height": 45.79,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 45.79,
  "y": 351.84,
  "width": 65.97,
  "x": 245.61,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_967E6427_9DEE_9567_41DD_9079CBA60178_HS_0.png",
     "class": "ImageResourceLevel",
     "width": 65,
     "height": 45
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "id": "overlay_90AF37DA_9DEF_B326_41DF_EA36BBEB3447",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.06,
   "image": "this.AnimatedImageResource_83FB1961_9E33_FE8A_41C7_18C81DFA0814",
   "pitch": -32.28,
   "yaw": -0.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_92AD170C_87CC_A64F_41D4_E99E30DA3AE4",
 "maps": [
  {
   "hfov": 19.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -32.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.2,
   "image": "this.AnimatedImageResource_83FB5961_9E33_FE8A_4190_49DEA227929C",
   "pitch": -32.4,
   "yaw": -4.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_8A28EA14_87D6_C7D6_41DF_D03DABAB489F",
 "maps": [
  {
   "hfov": 20.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -32.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.59,
   "image": "this.AnimatedImageResource_83E15969_9E33_FE9A_41E0_BB1879B1B37A",
   "pitch": -40.88,
   "yaw": 4.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9D12B8D2_88DD_C453_418D_B308FCF6167C",
 "maps": [
  {
   "hfov": 20.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -40.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9410C2B1_99EE_A743_41BD_CA43C71D786B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95AF81E5_9A1B_076D_41DB_5C0704EAE726, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 90,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_00000.png",
      "class": "ImageResourceLevel",
      "width": 1904,
      "height": 1904
     }
    ]
   },
   "pitch": 0,
   "yaw": 0
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_00002.png",
      "class": "ImageResourceLevel",
      "width": 1904,
      "height": 1904
     }
    ]
   },
   "pitch": 0,
   "hfov": 90,
   "yaw": -180
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_00003.png",
      "class": "ImageResourceLevel",
      "width": 1904,
      "height": 1904
     }
    ]
   },
   "pitch": 0,
   "hfov": 90,
   "yaw": -90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_00004.png",
      "class": "ImageResourceLevel",
      "width": 1904,
      "height": 1904
     }
    ]
   },
   "pitch": 90,
   "hfov": 90,
   "yaw": 0
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_00005.png",
      "class": "ImageResourceLevel",
      "width": 1904,
      "height": 1904
     }
    ]
   },
   "pitch": -90,
   "hfov": 90,
   "yaw": 0
  }
 ],
 "id": "overlay_89E85866_99ED_63C0_41B0_3729F5EB5E2A",
 "maps": [
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_2_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_3_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_4_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "hfov": 90,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_0_HS_1_5_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "MapViewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0%",
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "height": "93.186%",
 "toolTipShadowColor": "#333333",
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "bottom": "0%",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.46,
   "image": "this.AnimatedImageResource_83FE4964_9E33_FE8A_41DC_4103C6580CE2",
   "pitch": -38.47,
   "yaw": -4.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95B037C3_87EE_4CB2_4177_85EDDA9E628E",
 "maps": [
  {
   "hfov": 28.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -38.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.25,
   "image": "this.AnimatedImageResource_83FD4963_9E33_FE8E_41DB_134C36C348A6",
   "pitch": -36.79,
   "yaw": -41.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_91D32D9F_87D6_FCD2_418B_1CF751A52EC2",
 "maps": [
  {
   "hfov": 20.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -41.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -36.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.48,
   "image": "this.AnimatedImageResource_83FDF963_9E33_FE8E_41DA_44A2A85099CF",
   "pitch": -30.6,
   "yaw": -1.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_88327DF0_87DA_7C6E_41DF_EF79833FBFD3",
 "maps": [
  {
   "hfov": 18.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -30.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_91482CD5_9EEC_F77E_41D3_2010EC3A7534, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F9D038_9EFB_7A13_41BD_DEB6352708F2, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 39.9,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 1382,
      "height": 1520
     }
    ]
   },
   "pitch": 3.14,
   "yaw": -56.38
  }
 ],
 "id": "overlay_904B8A20_9EEB_52D6_41C4_1C3F4EBE1C67",
 "maps": [
  {
   "hfov": 39.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 181,
      "height": 200
     }
    ]
   },
   "pitch": 3.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_8FFCA662_9EEC_B35A_41DB_A6D7CF67E400, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F8F03B_9EFB_7A15_41A0_CDA8ED232E43, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 62.84,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 2048,
      "height": 995
     }
    ]
   },
   "pitch": -7.6,
   "yaw": 79.23
  }
 ],
 "id": "overlay_914BAFF7_9EED_513A_41CA_CB0FF88A910C",
 "maps": [
  {
   "hfov": 62.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 97
     }
    ]
   },
   "pitch": -7.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9EF678C2_88DE_44B2_41DD_1E0AF81B39C0, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9691391F_88D7_C5D2_41B0_023F25F6A524, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.92,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 271,
      "height": 191
     }
    ]
   },
   "pitch": -14.25,
   "yaw": -39.59
  }
 ],
 "id": "overlay_9E9FD395_88DF_C4D6_41DF_B2B9AB30B272",
 "maps": [
  {
   "hfov": 7.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -39.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 22,
      "height": 16
     }
    ]
   },
   "pitch": -14.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_8B991B8A_9A1E_1BD7_41DF_263E387277AE, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_95AA01E7_9A1B_076D_41E2_0EC317492DB4, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 84.96,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 2048,
      "height": 1467
     }
    ]
   },
   "pitch": 11.01,
   "yaw": -7.1
  }
 ],
 "id": "overlay_890B7170_9A11_E733_41E1_9D14DCA65E0D",
 "maps": [
  {
   "hfov": 84.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D1663F1_674C_8636_41B0_749278C02603_1_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 143
     }
    ]
   },
   "pitch": 11.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.34,
   "image": "this.AnimatedImageResource_83FC8962_9E33_FE8E_418B_4ED1A65113A4",
   "pitch": -23.32,
   "yaw": -0.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_88487856_87DE_4452_41BE_92C56AB523C7",
 "maps": [
  {
   "hfov": 18.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -23.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.84,
   "image": "this.AnimatedImageResource_83FD2963_9E33_FE8E_41B7_5B4A0B823EAE",
   "pitch": -28.77,
   "yaw": 2.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_97B279F4_87DB_C456_41D9_B54C550BC6BC",
 "maps": [
  {
   "hfov": 18.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -28.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.47,
   "image": "this.AnimatedImageResource_83FE1964_9E33_FE8A_41E0_BDA3BE6FAAF6",
   "pitch": -46.33,
   "yaw": 17.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_93F37B18_87EE_45DF_41A5_88311C6E2BDC",
 "maps": [
  {
   "hfov": 17.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 17.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -46.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.22,
   "image": "this.AnimatedImageResource_83FC3962_9E33_FE8E_41E0_6CC2DC7BB258",
   "pitch": -29.84,
   "yaw": -0.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8845AADF_87DF_C452_41D0_761ADFE4A62F",
 "maps": [
  {
   "hfov": 20.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_91DC874D_9EE4_B16E_41AA_21862A6D660A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F6F031_9EFB_7A15_41D6_91911F124DC1, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 44.25,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 1548,
      "height": 1405
     }
    ]
   },
   "pitch": 1.79,
   "yaw": -69.84
  }
 ],
 "id": "overlay_93949019_9EE7_4EF7_41C1_F39B7F475C97",
 "maps": [
  {
   "hfov": 44.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 199,
      "height": 181
     }
    ]
   },
   "pitch": 1.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9137CBFD_9EE4_B12E_4178_0CE1DE33DD5C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_88F58033_9EFB_7A15_41D1_262C3150B126, null, null, null, null, false)"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "hfov": 40.03,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 1387,
      "height": 1542
     }
    ]
   },
   "pitch": 1.33,
   "yaw": 65.44
  }
 ],
 "id": "overlay_90340608_9EE5_52D6_41DA_AD193332322B",
 "maps": [
  {
   "hfov": 40.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 65.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 179,
      "height": 200
     }
    ]
   },
   "pitch": 1.33
  }
 ]
},
{
 "textDecoration": "none",
 "fontFamily": "Arial",
 "paddingRight": 5,
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "id": "DropDown_84559F89_963B_E219_41D7_4CFD96176A3D",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 5,
 "popUpFontColor": "#000000",
 "minHeight": 20,
 "selectedPopUpBackgroundColor": "#663333",
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "data": {
  "name": "DropDownFP"
 },
 "popUpShadow": false,
 "popUpBackgroundOpacity": 0.9,
 "backgroundColorDirection": "vertical",
 "minWidth": 200,
 "selectedPopUpFontColor": "#FFFFFF",
 "top": "0%",
 "popUpBackgroundColor": "#FFFFFF",
 "popUpGap": 0,
 "playList": "this.DropDown_84559F89_963B_E219_41D7_4CFD96176A3D_playlist",
 "backgroundColor": [
  "#996600"
 ],
 "fontSize": 14,
 "height": "7.023%",
 "width": "100%",
 "gap": 0,
 "popUpShadowBlurRadius": 6,
 "shadow": false,
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "backgroundOpacity": 0.9,
 "paddingTop": 0,
 "borderRadius": 4,
 "class": "DropDown",
 "popUpShadowSpread": 1,
 "fontWeight": "normal",
 "arrowBeforeLabel": false,
 "popUpShadowColor": "#000000",
 "rollOverPopUpBackgroundColor": "#FFFFFF"
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_856676AF_97D0_7572_41E1_C3387072A9FB",
 "left": "12%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "minHeight": 1,
 "right": "12%",
 "children": [
  "this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E",
  "this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E"
 ],
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "top": "12%",
 "scrollBarOpacity": 0.5,
 "bottom": "12%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "gap": 10,
 "shadow": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "class": "Container",
 "data": {
  "name": "kotak3dpopup"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FC5962_9E33_FE8E_41C7_C0A4F58AB4DC",
 "levels": [
  {
   "url": "media/panorama_6D0D744E_6744_826A_41D2_16299F358104_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FA4960_9E33_FE8A_41CE_199E50FFF4BD",
 "levels": [
  {
   "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FBF961_9E33_FE8A_41E0_65EAC59EC722",
 "levels": [
  {
   "url": "media/panorama_6D15CEFD_6744_9E2E_419C_20D9A3A0CA75_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E06968_9E33_FE9A_419D_970366755738",
 "levels": [
  {
   "url": "media/panorama_6D28A34F_674C_866A_41C8_D7E7809F533D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E0D968_9E33_FE9A_41D7_A981445578D0",
 "levels": [
  {
   "url": "media/panorama_6D04D3F0_674C_8636_41D4_3D0671677C46_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FEE964_9E33_FE8A_41DF_2E08AFFE4988",
 "levels": [
  {
   "url": "media/panorama_6D183060_6744_8256_41D1_0569564649E4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FFE965_9E33_FE8A_41DF_626C5C727FD3",
 "levels": [
  {
   "url": "media/panorama_6D043FBD_674B_9E2E_41D0_B24984CD11FD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83F9B95A_9E33_FEBF_41D1_152C1195B20B",
 "levels": [
  {
   "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FAB95F_9E33_FEB6_41E3_090B52C60BD9",
 "levels": [
  {
   "url": "media/panorama_6C286C8F_6745_82EA_41D4_E816F04A581A_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E3296B_9E33_FE9E_41B1_CF7033F88A14",
 "levels": [
  {
   "url": "media/panorama_6D2DF186_674C_82DA_41BE_45FA10E0B843_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FF7965_9E33_FE8A_41C1_DCEC3096DCB9",
 "levels": [
  {
   "url": "media/panorama_6D2AC0D4_674B_827E_41D2_8E5F718ADE81_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E13969_9E33_FE9A_41B4_3EA9658D21FC",
 "levels": [
  {
   "url": "media/panorama_6D04C326_674C_87DA_41C1_ABCAFF334607_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E2196A_9E33_FE9E_41CB_F722D4E1BF75",
 "levels": [
  {
   "url": "media/panorama_6D0502FD_674D_8629_41D8_FA0B62DF423A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FB1961_9E33_FE8A_41C7_18C81DFA0814",
 "levels": [
  {
   "url": "media/panorama_6D240FC1_6744_FE56_41B4_64DD6A76B60B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FB5961_9E33_FE8A_4190_49DEA227929C",
 "levels": [
  {
   "url": "media/panorama_6D19D659_6747_8E76_41D5_8104CE581847_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83E15969_9E33_FE9A_41E0_BB1879B1B37A",
 "levels": [
  {
   "url": "media/panorama_6D2863E3_674D_865A_41D2_9D3A0CDD6217_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FE4964_9E33_FE8A_41DC_4103C6580CE2",
 "levels": [
  {
   "url": "media/panorama_6D27FFF7_6744_7E3A_41C9_3813EAD401B3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FD4963_9E33_FE8E_41DB_134C36C348A6",
 "levels": [
  {
   "url": "media/panorama_6D0C8189_6745_82D6_41AB_8804AF3A76FD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FDF963_9E33_FE8E_41DA_44A2A85099CF",
 "levels": [
  {
   "url": "media/panorama_6D1972F6_6744_863A_41D7_E3694AB0211B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FC8962_9E33_FE8E_418B_4ED1A65113A4",
 "levels": [
  {
   "url": "media/panorama_6D0D94F5_6747_823E_41C1_7741FF969972_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FD2963_9E33_FE8E_41B7_5B4A0B823EAE",
 "levels": [
  {
   "url": "media/panorama_6D0CF12C_6745_822E_41BF_FB6CE6A423EE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FE1964_9E33_FE8A_41E0_BDA3BE6FAAF6",
 "levels": [
  {
   "url": "media/panorama_6D0BCF2C_6744_9E2E_41D6_B2820DF397CA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_83FC3962_9E33_FE8E_41E0_6CC2DC7BB258",
 "levels": [
  {
   "url": "media/panorama_6D26A4E9_6744_8229_41CF_AEB837C07A40_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "paddingRight": 0,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderSize": 0,
 "url": "https://sketchfab.com/models/5088e0e545824e30818fa4793ee80835/embed",
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "minWidth": 1,
 "top": "0%",
 "width": "100%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "insetBorder": false,
 "height": "99.956%",
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "class": "WebFrame",
 "data": {
  "name": "web3dpopup"
 }
},
{
 "transparencyActive": false,
 "paddingRight": 0,
 "propagateClick": false,
 "id": "IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E",
 "horizontalAlign": "center",
 "minHeight": 1,
 "right": "-0.04%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 81.4,
 "minWidth": 1,
 "verticalAlign": "middle",
 "top": "0.14%",
 "iconURL": "skin/IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E.png",
 "mode": "push",
 "height": 58.35,
 "click": "this.setComponentVisibility(this.Container_8521810D_97D0_8F36_41B3_F3333DF9F808, false, 0, null, null, false); this.setComponentVisibility(this.Container_856676AF_97D0_7572_41E1_C3387072A9FB, false, 0, null, null, false); this.setComponentVisibility(this.WebFrame_84F8D306_97D7_9333_41B8_6BCB67BB5A4E, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_9AC29F0A_9790_C225_41C2_1A2CE9BF723E, false, 0, null, null, false)",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "class": "IconButton",
 "maxWidth": 670,
 "borderRadius": 0,
 "cursor": "hand",
 "maxHeight": 373,
 "data": {
  "name": "iconclose3d"
 }
}],
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
