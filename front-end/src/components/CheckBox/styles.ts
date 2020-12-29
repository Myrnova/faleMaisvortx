import styled from 'styled-components';

interface ContainerProps {
  checked: boolean;
}

export const CheckboxContainer = styled.div<ContainerProps>``;

export const HiddenCheckbox = styled.input.attrs({
  type: 'radio',
})<ContainerProps>``;

export const Text = styled.label<ContainerProps>``;

export const StyledCheckbox = styled.label<ContainerProps>``;
