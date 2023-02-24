import Section from '@/components/Section/Section';
import Hero from '@/components/Hero/Hero';
import StrongPointsList from '@/components/StrongPointsList/StrongPointsList';
import MainCTA from '@/components/MainCTA/MainCTA';

export default function Home() {
  return (
    <main>
      <Hero
        header={'Le <b>Quai Antique</b>'}
        paragraphs={[
          '<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta.</i>',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante ',
        ]}
        image={
          'https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/1/9/8/6/86891-1-eng-GB/5b43edfee48c-73660559_4K.jpg'
        }
        imageAlt="Photo du restaurant."
        $textIsLeft={true}
        $isOdd={true}
      />
      <Section
        id="strongPoints"
        header={'Nos points forts'}
        paragraphs={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
        ]}
        image={
          'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chef-cooking.jpg?quality=82&strip=1'
        }
        imageAlt="Le Chef au travail."
        childComponents={[
          <StrongPointsList />,
          <MainCTA
            textContent="Qu'attendez-vous ?"
            url="/reserver"
            theme="themeLightGreen"
          />,
        ]}
        $textIsLeft={false}
        $isOdd={false}
      />
    </main>
  );
}
