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

});
