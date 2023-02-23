import BasicHero from '@/components/BasicHero/BasicHero';

export default function Home() {
  return (
    <BasicHero
      header={'Le <b>Quai Antique</b>'}
      paragraphs={[
        '<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta.</i>',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante ',
      ]}
      image={
        'https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/1/9/8/6/86891-1-eng-GB/5b43edfee48c-73660559_4K.jpg'
      }
      imageAlt="Photo du restaurant."
      textIsLeft={true}
    />
  );
}
