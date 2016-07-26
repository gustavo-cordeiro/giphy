import $ from 'jquery';
import Giphy from './Core/Giphy';
import template from './views/giphy-list';

function formatSlugToCaption(slug) {
  const splited = slug.split('-');
  splited.splice(splited.length - 1, 1);

  return splited.join(' ');
}

function animateItems($giphy, delay = 50) {
  $giphy.find('.giphy__item').each(function(index, el){
    $(el).css('transition-delay', (index + 1)*100 + 'ms' );
  });

  setTimeout(() => $giphy.addClass('animation'), delay);

  return $giphy;
}

function listResults(data) {
  const giphy = data.map( d => {
    return {
      description: d.caption || formatSlugToCaption(d.slug),
      url: d.images.fixed_width_downsampled.url,
      height: d.images.fixed_width_downsampled.height,
      width: d.images.fixed_width_downsampled.width,
    };
  });

  const $tpl = $(template({ giphy }));
  $('#template-render').html($tpl);

  return animateItems($tpl);
}

$(async () => {
  const giphy = new Giphy();

  const $searchInput = $('input[type="search"]');
  const $submitButton = $('button');

  $submitButton.on('click', async () => {
    const data = await giphy.search($searchInput.val());
    listResults(data);
  });

  const data = await giphy.search('jet');
  listResults(data);
});
