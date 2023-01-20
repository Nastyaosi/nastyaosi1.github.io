// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
myBbcodeSettings = {
  nameSpace:          "rs-comment-bbcode", // Useful to prevent multi-instances CSS conflict
  markupSet: [
      {name:'Жирный',           key:'B', openWith:'[b]',                                closeWith:'[/b]'                                                        }, 
      {name:'Курсив',           key:'I', openWith:'[i]',                                closeWith:'[/i]'                                                        }, 
      {name:'Подчеркнутый',     key:'U', openWith:'[u]',                                closeWith:'[/u]'                                                        }, 
      {name:'Зачеркнутый',               openWith:'[s]',                                closeWith:'[/s]'                                                        },
      
      {separator:'&nbsp;'                                                                                                                                       },
      
      {name:'Маркированный список',      openWith:'[ul]',                               closeWith:'[/ul]'                                                       },
      {name:'Нумерованный список',       openWith:'[ol]',                               closeWith:'[/ol]'                                                       },
      {name:'Пункт списка',              openWith:'[li]',                               closeWith:'[/li]'                                                       },
      
      {separator:'&nbsp;'                                                                                                                                       },
      
      {name:'Добавить ссылку',  key:'L', openWith:'[url=[![Введите URL адрес]!]]',      closeWith:'[/url]',         placeHolder:'Введите анкор ссылки...'       },
      {name:'Цитата',                    openWith:'[quote]',                            closeWith:'[/quote]'                                                    }, 
      {name:'Код',                       openWith:'[code]',                             closeWith:'[/code]'                                                     }
      
   ]
}