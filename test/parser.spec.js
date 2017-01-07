import {expect} from 'chai';
import ChordParser from '../src/parser';

describe('Parser', () => {
  it('should accept valid chords', () => {
    const parser = new ChordParser();

    expect(parser.parse('F7sus4')).to.be.equal(true);
    expect(parser.parse('e-7')).to.be.equal(true);
    expect(parser.parse('Bb#5')).to.be.equal(true);
    expect(parser.parse('Emaj9/G♯')).to.be.equal(true);
    expect(parser.parse('A#7#9omit3add13')).to.be.equal(true);
  });

  it('should not accept invalid chords', () => {
    const parser = new ChordParser();

    expect(parser.parse('J5')).to.be.equal(false);
    expect(parser.parse(null)).to.be.equal(false);
    expect(parser.parse('')).to.be.equal(false);
    expect(parser.parse('A#7#9omt3add13')).to.be.equal(false);
  });

  it('should set an error describing where the parser failed', () => {
    const parser = new ChordParser();

    expect(parser.parse('FA7sus4')).to.be.equal(false);
    expect(parser.error).to.be.an.instanceof(Error);
    expect(parser.error.toString()).to.be.equal('Error: A');
  });

  it('should normalize the chord presentation string', () => {
    const parser = new ChordParser();

    const verify = (input, output) => {
      parser.parse(input);
      expect(parser.toString()).to.be.equal(output);
    };
    verify('CM7', 'Cmaj7');
    verify('d7sus4', 'D7sus4');
    verify('dsus', 'Dsus4');
    verify('f7sus', 'F7sus4');
    verify('dsus2', 'Dsus2');
    verify('H7add#11+9', 'B7♯9add♯11');
  });

});
