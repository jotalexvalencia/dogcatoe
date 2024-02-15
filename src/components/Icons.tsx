import React from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type IconsProps = PropsWithChildren<{ name: string }>;

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case 'cat': 
      return <Icon name="cat" size={50} color="#EC4849" />;
    case 'dog': 
      return <Icon name="dog" size={50} color="#26ae60" />;
    default:
      return <Icon name="pen" size={50} color="#0D0D0D" />;
  }
};

export default Icons;